const { Op, Transaction } = require("../../../db/models");

const { hideCurrency } = require("../../currency");

const helper = {};

helper.info = async (id) => {
  var list = {};
  await Transaction.findOne({
    where: {
      id: id,
      tipe: {
        [Op.in]: ["beli_produk_prabayar", "beli_produk_pascabayar"],
      },
    },
  }).then(async (val) => {
    if (val) {
      list["id"] = val.id;
      list["kode"] = val.kode;
      list["tipe"] = val.tipe;
      list["saldo_before"] = val.saldo_before;
      list["saldo_after"] = val.saldo_after;
    }
  });

  return list;
};

helper.check_id = async (value) => {
  check = await Transaction.findOne({
    where: {
      id: value,
      tipe: {
        [Op.in]: ["beli_produk_prabayar", "beli_produk_pascabayar"],
      },
    },
  });
  if (!check) {
    throw new Error("Id Transaksi Tidak Terdaftar Dipangkalan Data.");
  }
  return true;
};

// helper.member_info = async (id) => {
//   var list = {};
//   await Member.findOne({
//     where: { id: id },
//   }).then(async (val) => {
//     if (val) {
//       list["id"] = val.id;
//       list["fullname"] = val.fullname;
//       list["whatsapp_number"] = val.whatsapp_number;
//       list["saldo"] = val.saldo;
//     }
//   });
//   return list;
// };

// helper.kostumer_id = async (id) => {
//   check = await Member.findOne({
//     where: { id: id, agen_id: { [Op.is]: null } },
//   });
//   if (!check) {
//     throw new Error("Id Member Tidak Terdaftar Dipangkalan Data.");
//   }
//   return true;
// };

// helper.currency_not_null = async (value) => {
//   var currency = await hideCurrency(value);
//   if (currency <= 0) {
//     throw new Error("Pembayaran Fee Agen Tidak Boleh Rp 0");
//   }
//   return true;
// };

module.exports = helper;
