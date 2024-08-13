const express = require("express");
// const { verify } = require("jsonwebtoken");
// const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../../../controllers/user/tes_produk/index");
const helper = require("../../../helpers/user/tes_produk/index");

//------MIDDLEWARE-----//
const {
  verify_session,
  verify_token,
} = require("../../../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.post(
  "/Users/Tes_produk/server_side",
  [verify_session],
  controllers.server_side
);

// router.get(
//   "/Users/Tripay_prabayar/get_operator_tripay",
//   [verify_session],
//   controllers.get_operator_tripay
// );

router.get(
  "/Users/Tes_produk/info_tes",
  [verify_session],
  controllers.info_tes
);

//
router.post(
  "/Users/Tes_produk/get_produk_seller",
  [verify_token],
  body("seller_id")
    .notEmpty()
    .withMessage("ID Seller Tidak Boleh Kosong")
    .trim()
    .custom(helper.check_seller_id),
  controllers.get_produk_seller
);

module.exports = router;
