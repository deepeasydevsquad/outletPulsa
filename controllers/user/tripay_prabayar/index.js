const { error_msg } = require("../../../helpers/error");
const { validationResult } = require("express-validator");
const Model_r = require("./Model_r");
const Model_cud = require("./Model_cud");
const controllers = {};

controllers.server_side;
/**
 * Fungsi untuk menampilkan daftar server
 **/
controllers.server_side = async (req, res) => {
  const model_r = new Model_r(req);
  const data = await model_r.server_side();
  res.status(200).json(data);
};

/**
 * Fungsi untuk Mengambil Daftar Operator Tripay yang terdapat didalam database
 **/
controllers.get_operator_tripay = async (req, res) => {
  const model_r = new Model_r(req);
  const info = await model_r.get_operator_tripay();
  // error checking
  if (info.error) {
    res.status(400).json({
      error: true,
      error_msg: "Data Operator Tripay Gagal Ditemukan",
    });
  } else {
    res.status(200).json({
      error: false,
      error_msg: "Data Operator Tripay Berhasil Ditemukan",
      data: info.data,
    });
  }
};

/**
 * Fungsi untuk Menghapus koneksi produk Tripay dengan Produk
 **/
controllers.delete_koneksi = async (req, res) => {
  console.log("-------------1-------------");
  console.log("-------------1-------------");
  console.log("-------------1-------------");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    console.log("-------------2-------------");
    console.log("-------------2-------------");
    console.log("-------------2-------------");
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.delete_koneksi();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg:
          "Proses Menghapus Koneksi Produk Tripay Prabayar Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg:
          "Proses Menghapus Koneksi Produk Tripay Prabayar Gagal Dilakukan.",
      });
    }
  }
};

/**
 * Fungsi untuk mengambil info sinkronisasi produk IAK
 **/
controllers.info_sinkronisasi_produk_tripoay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_r = new Model_r(req);
    const info = await model_r.info_sinkronisasi_produk_tripay();
    // error checking
    if (info.error) {
      res.status(400).json({
        error: true,
        error_msg: "Info Sinkronisasi Produk Tripay Gagal Ditemukan",
      });
    } else {
      res.status(200).json({
        error: false,
        error_msg: "Info Sinkronisasi Produk Tripay Berhasil Ditemukan",
        data: info.data,
      });
    }
  }
};

/**
 * Fungsi untuk melakukan sinkronisasi produk IAK
 **/
controllers.sinkronisasi_produk_tripay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return ERROR
    const err_msg = await error_msg(errors);
    res.status(400).json({ error: true, error_msg: err_msg });
  } else {
    const model_cud = new Model_cud(req);
    // delete process
    await model_cud.sinkronisasi_produk_tripay();
    // get response
    if (await model_cud.response()) {
      res.status(200).json({
        error: false,
        error_msg:
          "Proses Sinkronisasi Produk Tripay dengan Produk Outlet Pulsa Berhasil Dilakukan",
      });
    } else {
      res.status(400).json({
        error: true,
        error_msg:
          "Proses Sinkronisasi Produk Tripay dengan Produk Outlet Pulsa Gagal Dilakukan.",
      });
    }
  }
};

// /**
//  * Fungsi untuk mengambil info data server
//  **/
// controllers.info_status_server = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_r = new Model_r(req);
//     const info = await model_r.info_server();
//     // error checking
//     if (info.error) {
//       res.status(400).json({
//         error: true,
//         error_msg: "Data Info Edit Status Server Gagal Ditemukan",
//       });
//     } else {
//       res.status(200).json({
//         error: false,
//         error_msg: "Data Info Edit Status Server Berhasil Ditemukan",
//         data: info.data.status,
//       });
//     }
//   }
// };

// /**
//  * Fungsi untuk melakukan perubahan status server
//  **/
// controllers.change_status_server = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // return ERROR
//     const err_msg = await error_msg(errors);
//     res.status(400).json({ error: true, error_msg: err_msg });
//   } else {
//     const model_cud = new Model_cud(req);
//     // delete process
//     await model_cud.change_status_server();
//     // get response
//     if (await model_cud.response()) {
//       res.status(200).json({
//         error: false,
//         error_msg: "Proses Mengupdate Status Server Berhasil Dilakukan",
//       });
//     } else {
//       res.status(400).json({
//         error: true,
//         error_msg: "Proses Mengupdate Status Server gagal dilakukan.",
//       });
//     }
//   }
// };

module.exports = controllers;
