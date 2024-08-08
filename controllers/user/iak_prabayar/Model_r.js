const moment = require("moment");
const {
  Op,
  Iak_prabayar_produk,
  Iak_prabayar_operator,
  Iak_prabayar_type,
  Produk_prabayar,
  Operator,
} = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");
const { info } = require("../../../helpers/user/iak_prabayar/index");

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

    var where = { status: body.active == "active" ? "active" : "non active" };
    if (body.search != undefined && body.search != "") {
      where = {
        ...where,
        ...{
          [Op.or]: [
            { kode: { [Op.like]: "%" + body.search + "%" } },
            { name: { [Op.like]: "%" + body.search + "%" } },
          ],
        },
      };
    }

    if (body.operator != 0) {
      where = { ...where, ...{ operator_id: body.operator } };
    }

    if (body.koneksi != "semua") {
      if (body.koneksi == "sudah_konek") {
        where = { ...where, ...{ produk_id: { [Op.ne]: null } } };
      } else {
        where = { ...where, ...{ produk_id: null } };
      }
    }

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["id", "DESC"]];
    sql["attributes"] = [
      "id",
      "kode",
      "name",
      "price",
      "status",
      "produk_id",
      "updatedAt",
    ];
    sql["where"] = where;

    sql["include"] = [
      {
        required: true,
        model: Iak_prabayar_operator,
        attributes: ["name"],
        include: {
          required: true,
          model: Iak_prabayar_type,
          attributes: ["type"],
        },
      },
    ];

    const query = await db_list_server(sql);
    const q = await Iak_prabayar_produk.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    var list_produk_id = [];
    if (total > 0) {
      await Iak_prabayar_produk.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              kode: e.kode,
              name: e.name,
              price: e.price,
              status: e.status,
              operator: e.Iak_prabayar_operator.name,
              type: e.Iak_prabayar_operator.Iak_prabayar_type.type,
              koneksi: {},
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
            if (e.produk_id != null) {
              list_produk_id[e.produk_id] = i;
            }
            i++;
          })
        );
      });

      // convert array to object
      const tempListProdukId = Object.assign({}, list_produk_id);

      if (Object.keys(tempListProdukId).length > 0) {
        let ids = Object.keys(tempListProdukId);
        await Produk_prabayar.findAll({
          attributes: ["id", "kode", "name"],
          where: { id: { [Op.in]: ids } },
          include: {
            require: true,
            model: Operator,
            attributes: ["name"],
          },
        }).then(async (value) => {
          await Promise.all(
            await value.map(async (e) => {
              list[list_produk_id[e.id]].koneksi = {
                kode: e.kode,
                name: e.name,
                operator:
                  e.Operator != null
                    ? e.Operator.name
                    : "<b style='color :red'>Operator NULL</b>",
              };
            })
          );
        });
      }
    }

    return {
      data: list,
      total: total,
    };
  }

  async get_operator_iak() {
    var list = [];
    await Iak_prabayar_operator.findAll().then(async (value) => {
      var i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list[i] = {
            id: e.id,
            name: e.name,
          };
          i++;
        })
      );
    });
    return { error: false, data: list };
  }

  async info_sinkronisasi_produk_iak() {
    try {
      var list_produk_id = [];
      await Iak_prabayar_produk.findAll({
        where: { produk_id: { [Op.ne]: null } },
      }).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list_produk_id[i] = e.produk_id;
            i++;
          })
        );
      });

      var where = {};
      if (list_produk_id.length > 0) {
        where = { id: { [Op.notIn]: list_produk_id } };
      }

      var list = [];
      await Produk_prabayar.findAll({
        where: where,
        include: {
          required: true,
          model: Operator,
          attributes: ["name"],
        },
      }).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              kode: e.kode,
              name: e.name,
              operator: e.Operator.name,
            };
            i++;
          })
        );
      });

      return { error: false, data: list };
    } catch (error) {
      return { error: true };
    }
  }
}

module.exports = Model_r;
