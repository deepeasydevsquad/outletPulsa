const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/user/daftar_server/index");
const helper = require("../../../helpers/user/daftar_server/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Daftar_server/server_side",
  [verify_session],
  controllers.server_side
);

router.post(
  "/Users/Daftar_server/add_new_server",
  [verify_token],
  body("kode")
    .notEmpty()
    .withMessage("Kode Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_kode_server),
  body("name").notEmpty().trim().withMessage("Nama Server Tidak Boleh Kosong"),
  controllers.add_new_server
);

router.post(
  "/Users/Daftar_server/delete",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("Id Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.delete
);

// info_edit_server
router.post(
  "/Users/Daftar_server/info_edit_server",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("Id Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.info_edit_server
);

router.post(
  "/Users/Daftar_server/update",
  [verify_token],
  body("id").trim().custom(helper.check_id),
  body("kode")
    .notEmpty()
    .withMessage("Kode Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_kode_server),
  body("name").notEmpty().trim().withMessage("Nama Server Tidak Boleh Kosong"),
  controllers.update
);

router.post(
  "/Users/Daftar_server/info_status_server",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("Id Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  controllers.info_status_server
);

router.post(
  "/Users/Daftar_server/change_status_server",
  [verify_token],
  body("id")
    .notEmpty()
    .withMessage("Id Server Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_id),
  body("status")
    .notEmpty()
    .withMessage("Status Tidak Boleh Kosong")
    .trim()
    .isIn(["active", "inactive"])
    .withMessage("Status Server tidak ditemukan"),
  controllers.change_status_server
);

module.exports = router;
