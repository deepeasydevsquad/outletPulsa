const moment = require("moment");
const { Op, Otp, Member } = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  // get data in server side
  async server_side() {
    const body = this.req.body;
    var limit = body.perpage;
    var page = 1;

    if (body.pageNumber != undefined) page = body.pageNumber;

    var where = {};
    if (body.search != undefined && body.search != "") {
      where = {
        [Op.or]: [{ nomor_tujuan: { [Op.like]: "%" + body.search + "%" } }],
      };
    }

    where = { ...where, ...{ type: "login" } };

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["updatedAt", "DESC"]];
    sql["attributes"] = ["id", "nomor_tujuan", "otp", "updatedAt"];
    sql["where"] = where;
    sql["include"] = {
      required: true,
      model: Member,
      attributes: ["fullname", "whatsapp_number", "kode", "saldo"],
    };

    const query = await db_list_server(sql);
    const q = await Otp.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    if (total > 0) {
      await Otp.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              nomor_tujuan: e.nomor_tujuan,
              otp: e.otp,
              kode: e.Member.kode,
              fullname: e.Member.fullname,
              whatsapp_number: e.Member.whatsapp_number,
              saldo: e.Member.saldo,
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
            i++;
          })
        );
      });
    }

    return {
      data: list,
      total: total,
    };
  }

  // async info_edit() {
  //   const body = this.req.body;
  //   try {
  //     var data = [];
  //     await Operator.findAll({
  //       attributes: ["id", "kode", "name"],
  //       where: { id: body.id },
  //     }).then(async (value) => {
  //       var i = 0;
  //       await Promise.all(
  //         await value.map(async (e) => {
  //           data = {
  //             id: e.id,
  //             kode: e.kode,
  //             name: e.name,
  //           };
  //           i++;
  //         })
  //       );
  //     });
  //     return { error: false, data: data };
  //   } catch (error) {
  //     return { error: true };
  //   }
  // }
}

module.exports = Model_r;
