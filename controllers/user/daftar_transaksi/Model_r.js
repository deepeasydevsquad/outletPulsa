const moment = require("moment");
const {
  Op,
  Server,
  Member,
  Transaction,
  Transaction_prabayar,
  Transaction_pascabayar,
  Produk_prabayar,
} = require("../../../db/models");
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
        [Op.or]: [{ kode: { [Op.like]: "%" + body.search + "%" } }],
      };
    }

    var where_transaksi_produk = {};
    if (
      body.status_transaksi != undefined &&
      body.status_transaksi != "semua"
    ) {
      console.log("-----------1");
      where_transaksi_produk = {
        status: body.status_transaksi,
      };
    }

    where = {
      ...where,
      ...{
        tipe: { [Op.in]: ["beli_produk_prabayar", "beli_produk_pascabayar"] },
      },
    };

    var sql = {};
    sql["limit"] = limit * 1;
    sql["offset"] = (page - 1) * limit;
    sql["order"] = [["updatedAt", "DESC"]];
    sql["attributes"] = [
      "id",
      "kode",
      "saldo_before",
      "saldo_after",
      "ket",
      "updatedAt",
    ];
    sql["where"] = where;
    sql["include"] = [
      {
        require: true,
        model: Member,
        attributes: ["kode", "fullname", "whatsapp_number"],
      },
      {
        require: false,
        model: Transaction_prabayar,
        attributes: [
          "nomor_tujuan",
          "purchase_price",
          "selling_price",
          "kode_agen",
          "fee_agen",
          "laba",
          "status",
        ],
        include: [
          {
            require: true,
            model: Produk_prabayar,
            attributes: ["kode", "name"],
          },
          {
            require: false,
            model: Server,
            attributes: ["kode", "name"],
          },
        ],
      },
      {
        require: false,
        model: Transaction_pascabayar,
        attributes: [
          "nomor_tujuan",
          "nominal",
          "total_nominal",
          "admin_fee",
          "comission",
          "outlet_comission",
          "member_comission",
          "noref",
          "kode_agen",
          "laba",
          "fee_agen",
          "status",
        ],
        include: {
          require: false,
          model: Server,
          attributes: ["kode", "name"],
        },
      },
    ];

    const query = await db_list_server(sql);
    const q = await Transaction.findAndCountAll(query.total);
    const total = await q.count;
    var list = [];
    var server_id = [];
    if (total > 0) {
      await Transaction.findAll(query.sql).then(async (value) => {
        var i = 0;
        await Promise.all(
          await value.map(async (e) => {
            var produk = {};
            var transaction_pascabayar = {};
            console.log("---------------------1");
            // if (e.Transaction_pascabayars) {
            //   console.log("---------------------2");
            //   transaction_pascabayar = {
            //     nomor_tujuan: e.Transaction_pascabayars.nomor_tujuan,
            //     nominal: e.Transaction_pascabayars.nominal,
            //     total_nominal: e.Transaction_pascabayars.total_nominal,
            //     admin_fee: e.Transaction_pascabayars.admin_fee,
            //     comission: e.Transaction_pascabayars.comission,
            //     outlet_comission: e.Transaction_pascabayars.outlet_comission,
            //     member_comission: e.Transaction_pascabayars.member_comission,
            //     noref: e.Transaction_pascabayars.noref,
            //     kode_agen: e.Transaction_pascabayars.kode_agen,
            //     laba: e.Transaction_pascabayars.laba,
            //     fee_agen: e.Transaction_pascabayars.fee_agen,
            //     status: e.Transaction_pascabayars.status,
            //     kode_server: e.Transaction_pascabayars.Server.kode,
            //     name_server: e.Transaction_pascabayars.Server.name,
            //   };
            // }

            var transaction_prabayar = {};
            console.log("---------------------3");
            if (e.Transaction_prabayars) {
              console.log("---------------------4");
              var trans = e.Transaction_prabayars[0];

              produk = {
                kode: trans.Produk_prabayar.kode,
                name: trans.Produk_prabayar.name,
                tipe: "prabayar",
              };

              transaction_prabayar = {
                nomor_tujuan: trans.nomor_tujuan,
                purchase_price: trans.purchase_price,
                selling_price: trans.selling_price,
                kode_agen: trans.kode_agen,
                fee_agen: trans.fee_agen,
                laba: trans.laba,
                status: trans.status,
                kode_server: trans.Server.kode,
                name_server: trans.Server.name,
              };
            }

            list[i] = {
              id: e.id,
              kode: e.kode,
              saldo_before: e.saldo_before,
              saldo_after: e.saldo_after,
              ket: e.ket,
              produk_info: produk,
              member_info: {
                kode: e.Member.kode,
                name: e.Member.fullname,
                whatsapp_number: e.Member.whatsapp_number,
              },
              transaction_pascabayar: transaction_pascabayar,
              transaction_prabayar: transaction_prabayar,
              updatedAt: moment(e.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
            server_id[e.id] = i;
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
}

module.exports = Model_r;
