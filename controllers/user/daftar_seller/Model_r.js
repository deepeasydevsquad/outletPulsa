const moment = require("moment");
const {
  Op,
  Member,
  Digiflazz_seller,
  Digiflazz_seller_product,
} = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");
const { info } = require("../../../helpers/user/daftar_seller/index");

class Model_r {
  constructor(req) {
    this.req = req;
  }

  /**
   * Fungsi untuk mengambilda data seller dari database
   **/
  async server_side() {
    const body = this.req.body;
    var limit = body.perpage;
    var page = 1;

    if (body.pageNumber != undefined) page = body.pageNumber;

    var where = {};
    if (body.search != undefined && body.search != "") {
      where = {
        name: { [Op.like]: "%" + body.search + "%" },
      };
    }

    if (body.status_seller != "semua" && body.status_seller != undefined) {
      if (body.status_seller == "terblokir") {
        where = { ...where, ...{ status: "banned" } };
      } else {
        where = { ...where, ...{ status: "unbanned" } };
      }
    }

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["id", "DESC"]];
    sql["attributes"] = ["id", "name", "status", "rangking", "updatedAt"];
    sql["where"] = where;

    const query = await db_list_server(sql);
    const q = await Digiflazz_seller.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    var seller_id = {};
    if (total > 0) {
      await Digiflazz_seller.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              name: e.name,
              status: e.status,
              jumlah_produk: 0,
              rangking: e.rangking,
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
            seller_id[e.id] = i;
            i++;
          })
        );
      });

      if (Object.keys(seller_id).length > 0) {
        var seller_produk = {};
        await Digiflazz_seller_product.findAll().then(async (value) => {
          var i = 0;
          await Promise.all(
            await value.map(async (e) => {
              if (seller_produk[e.seller_id] != undefined) {
                seller_produk[e.seller_id].push(e.id);
              } else {
                seller_produk[e.seller_id] = [e.id];
              }
            })
          );
        });

        for (let x in seller_produk) {
          if (seller_id[x] != undefined) {
            list[seller_id[x]]["jumlah_produk"] = seller_produk[x].length;
          }
        }
      }
    }

    return {
      data: list,
      total: total,
    };
  }

  /**
   * Fungsi untuk mengambil informasi rangking seller
   **/
  async get_info_rangking_seller() {
    const body = this.req.body;
    try {
      var rangking = 0;
      await Digiflazz_seller.findAll({
        where: {
          id: body.id,
        },
      }).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            rangking = e.rangking;
          })
        );
      });
      return { error: false, data: rangking };
    } catch (error) {
      return { error: true };
    }
  }
}

module.exports = Model_r;
