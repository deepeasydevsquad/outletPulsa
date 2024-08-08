const moment = require("moment");
const {
  Op,
  Digiflazz_category,
  Digiflazz_brand,
  Digiflazz_type,
  Digiflazz_product,
  Digiflazz_seller_product,
  Digiflazz_seller,
  Produk_prabayar,
  Digiflazz_sellers,
  Operator,
} = require("../../../db/models");
const { db_list_server } = require("../../../helpers/db_ops");
const { info } = require("../../../helpers/user/digiflaz_prabayar/index");

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

    var where = { status: body.active == "active" ? "active" : "inactive" };
    if (body.search != undefined && body.search != "") {
      where = {
        ...where,
        ...{
          [Op.or]: [
            {
              selectedSellerBuyerSkuKode: {
                [Op.like]: "%" + body.search + "%",
              },
            },
            { name: { [Op.like]: "%" + body.search + "%" } },
          ],
        },
      };
    }

    if (body.kategori != 0) {
      where = { ...where, ...{ category_id: body.kategori } };
    }

    if (body.type != 0) {
      where = { ...where, ...{ type_id: body.type } };
    }

    if (body.brand != 0) {
      where = { ...where, ...{ brand_id: body.brand } };
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
      "status",
      "name",
      "selectedSellerBuyerSkuKode",
      "selectedSellerPrice",
      "selectedSellerStartCutOff",
      "selectedSellerEndCutOff",
      "produk_id",
      "updatedAt",
    ];
    sql["where"] = where;

    sql["include"] = [
      {
        required: true,
        model: Digiflazz_category,
        attributes: ["name"],
      },
      {
        required: true,
        model: Digiflazz_brand,
        attributes: ["name"],
      },
      {
        required: true,
        model: Digiflazz_type,
        attributes: ["name"],
      },
    ];

    const query = await db_list_server(sql);
    const q = await Digiflazz_product.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    var list_produk_id = [];
    var list_produk_digiflaz_id = [];
    var seller_selected = [];
    if (total > 0) {
      await Digiflazz_product.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              name: e.name,
              kategori: e.Digiflazz_category.name,
              brand: e.Digiflazz_brand.name,
              type: e.Digiflazz_type.name,
              kode: e.selectedSellerBuyerSkuKode,
              price: e.selectedSellerPrice,
              status: e.status,
              koneksi: {},
              seller: {},
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };

            list_produk_digiflaz_id[i] = e.id;

            seller_selected[i] = e.selectedSellerBuyerSkuKode;

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

      if (list_produk_digiflaz_id.length > 0) {
        var list_seller = {};
        await Digiflazz_seller_product.findAll({
          attributes: [
            "product_digiflazz_id",
            "id",
            "buyerSkuKode",
            "price",
            "sellerProductStatus",
          ],
          where: { product_digiflazz_id: { [Op.in]: list_produk_digiflaz_id } },
          include: {
            require: true,
            model: Digiflazz_seller,
            where: { status: "unbanned" },
            attributes: ["name"],
          },
        }).then(async (value) => {
          await Promise.all(
            await value.map(async (e) => {
              if (list_seller[e.product_digiflazz_id] == undefined) {
                list_seller[e.product_digiflazz_id] = [
                  {
                    seller_id: e.id,
                    seller_name: e.Digiflazz_seller.name,
                    seller_code: e.buyerSkuKode,
                    seller_price: e.price,
                    seller_product_status: e.sellerProductStatus,
                    seller_selected: seller_selected.includes(e.buyerSkuKode)
                      ? "selected"
                      : "",
                  },
                ];
              } else {
                list_seller[e.product_digiflazz_id].push({
                  seller_id: e.id,
                  seller_name: e.Digiflazz_seller.name,
                  seller_code: e.buyerSkuKode,
                  seller_price: e.price,
                  seller_product_status: e.sellerProductStatus,
                  seller_selected: seller_selected.includes(e.buyerSkuKode)
                    ? "selected"
                    : "",
                });
              }
            })
          );
        });

        if (Object.keys(list_seller).length > 0) {
          for (x in list_produk_digiflaz_id) {
            if (list_seller[list_produk_digiflaz_id[x]] != undefined) {
              // list_seller[list_produk_digiflaz_id[x]].seller_selected = ;

              list[x].seller = list_seller[list_produk_digiflaz_id[x]];
            }
          }
        }
      }
    }

    return {
      data: list,
      total: total,
    };
  }

  async get_param_digiflaz() {
    var list_category = [];
    await Digiflazz_category.findAll().then(async (value) => {
      var i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list_category[i] = {
            id: e.id,
            name: e.name,
          };
          i++;
        })
      );
    });

    var list_brand = [];
    await Digiflazz_brand.findAll().then(async (value) => {
      var i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list_brand[i] = {
            id: e.id,
            name: e.name,
          };
          i++;
        })
      );
    });

    var list_type = [];
    await Digiflazz_type.findAll().then(async (value) => {
      var i = 0;
      await Promise.all(
        await value.map(async (e) => {
          list_type[i] = {
            id: e.id,
            name: e.name,
          };
          i++;
        })
      );
    });
    return {
      error: false,
      data: { category: list_category, brand: list_brand, type: list_type },
    };
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

  async get_info_pilih_seller_manual() {
    const body = this.req.body;
    var data = {};

    try {
      var selected_code = "";
      await Digiflazz_product.findOne({
        where: { id: body.id },
      }).then(async (val) => {
        if (val) {
          selected_code = val.selectedSellerBuyerSkuKode;
        }
      });

      var list = [];
      await Digiflazz_seller_product.findAll({
        where: {
          buyerSkuKode: { [Op.ne]: selected_code },
          product_digiflazz_id: body.id,
        },
        include: {
          required: true,
          model: Digiflazz_seller,
          where: {
            status: "unbanned",
          },
        },
      }).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            list[i] = {
              id: e.id,
              seller_id: e.seller_id,
              name: e.Digiflazz_seller.name,
              price: e.price,
              kode: e.buyerSkuKode,
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

  async info_sinkronisasi_produk_digiflaz() {
    try {
      var list_produk_id = [];
      await Digiflazz_product.findAll({
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
      // sql["order"] = [["id", "DESC"]];
      var list = [];
      await Produk_prabayar.findAll({
        where: where,
        order: [["operator_id", "DESC"]],
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
      console.log("+++++++++++++++++error");
      console.log(error);
      console.log("+++++++++++++++++error");
      return { error: true };
    }
  }
}

module.exports = Model_r;
