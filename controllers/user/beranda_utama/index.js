const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
const Model_cud = require("./Model_cud");
const Iak = require("../../../library/iak");
const Tripay = require("../../../library/tripay");
const Digiflaz = require("../../../library/digiflaz");

const controllers = {};

/**
 * Fungsi untuk mengambil saldo iak
 **/
controllers.get_saldo_iak = async (req, res) => {
  const iak = new Iak();
  try {
    await iak.cek_saldo(async (re) => {
      res.status(200).json({
        error: false,
        error_msg: "Data Berhasil Ditemukan",
        data: re.saldo,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      error_msg: "Data Gagal Ditemukan",
    });
  }
};

//

/**
 * Fungsi untuk mengambil saldo tripay
 **/
controllers.get_saldo_tripay = async (req, res) => {
  const tripay = new Tripay();
  try {
    await tripay.cek_saldo(async (re) => {
      res.status(200).json({
        error: false,
        error_msg: "Data Berhasil Ditemukan",
        data: re.saldo,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      error_msg: "Data Gagal Ditemukan",
    });
  }
};

controllers.get_saldo_digiflaz = async (req, res) => {
  const digiflaz = new Digiflaz();
  try {
    await digiflaz.cek_saldo(async (re) => {
      console.log("____________________");
      console.log(re);
      console.log("____________________");
      res.status(200).json({
        error: false,
        error_msg: "Data Berhasil Ditemukan",
        data: re.data.saldo,
      });
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      error_msg: "Data Gagal Ditemukan",
    });
  }
};

// /**
//  * Fungsi untuk mengambil info add bank transfer
//  **/
// controllers.info_add = async (req, res) => {
//   const model_r = new Model_r(req);
//   const info = await model_r.info_add();
//   // error checking
//   if (info.error) {
//     res.status(400).json({
//       error: true,
//       error_msg: "Data Info Add Bank Transfer Gagal Ditemukan",
//     });
//   } else {
//     res.status(200).json({
//       error: false,
//       error_msg: "Data Info Add Bank Transfer Berhasil Ditemukan",
//       data: info.data,
//     });
//   }
// };

// /**
//  * Fungsi untuk menghapus data bank transfer
//  **/
// controllers.delete = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const body = req.body;
//     const model_cud = new Model_cud(req);
//     // delete process
//     await model_cud.delete(body.id);
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Penghapusan Data Bank Transfer berhasil dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Penghapusan Data Bank Transfer gagal dilakukan.",
//       });
//     }
//   }
// };

// /**
//  * Fungsi untuk menambahkan bank transfer baru
//  **/
// controllers.add = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // add new bank transfer
//     await model_cud.add();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Menambahkan Bank Transfer Berhasil Dilakukan.",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Menambahkan Bank Transfer Gagal Dilakukan.",
//       });
//     }
//   }
// };

/**
 * Fungsi untuk mengambil info edit bank transfer
 **/
controllers.get_transaksi_hari_ini = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.get_transaksi_hari_ini();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Transaksi Hari Ini Berhasil Ditemukan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Transaksi Hari Ini Gagal Ditemukan.",
      });
    }
  }
};

controllers.get_member_baru_hari_ini = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.get_member_baru_hari_ini();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Member Baru Ini Berhasil Ditemukan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Member Baru Ini Gagal Ditemukan.",
      });
    }
  }
};

//

controllers.total_member = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.total_member();
    // get response
    if (info.error == false) {
      res.status(200).json({
        error: false,
        error_msg: "Info Total Member Ini Berhasil Ditemukan.",
        data: info.data,
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg: "Info Total Member Ini Gagal Ditemukan.",
      });
    }
  }
};

// /**
//  * Fungsi untuk melakukan update data bank transfer
//  **/
// controllers.update = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // update bank transfer
//     await model_cud.update();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Update Bank Transfer Berhasil Dilakukan.",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Update Bank Transfer Gagal Dilakukan.",
//       });
//     }
//   }
// };

module.exports = controllers;

// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   // return ERROR
//   const err_msg = await error_msg(errors);
//   res.status(400).json({ error: true, error_msg: err_msg });
// } else {
//   const model_r = new Model_r(req);
//   const info = await model_r.info_add_kostumer_agen();
//   // error checking
//   if (info.error) {
//     res.status(400).json({
//       error: true,
//       error_msg: "Data Info Add Kostumer Agen Gagal Ditemukan",
//     });
//   } else {
//     res.status(200).json({
//       error: false,
//       error_msg: "Data Info Add Kostumer Agen Berhasil Ditemukan",
//       data: info.data,
//     });
//   }
// }
// /**
//  * Fungsi untuk mengambil info kostumer agen
//  **/
// controllers.info_add_kostumer_agen = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_r = new Model_r(req);
//     const info = await model_r.info_add_kostumer_agen();
//     // error checking
//     if (info.error) {
//       res.status(400).json({
//         error: true,
//         error_msg: "Data Info Add Kostumer Agen Gagal Ditemukan",
//       });
//     } else {
//       res.status(200).json({
//         error: false,
//         error_msg: "Data Info Add Kostumer Agen Berhasil Ditemukan",
//         data: info.data,
//       });
//     }
//   }
// };
