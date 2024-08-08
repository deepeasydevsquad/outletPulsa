const express = require("express");
const { verify } = require("jsonwebtoken");
const path = require("path");
const { body, validationResult } = require("express-validator");
const controllers = require("../controllers/user/index");

//------MIDDLEWARE-----//
const { verify_session } = require("../middleware/verify_session_token");

// ROUTER
const router = express.Router();

router.get("/Users/", [verify_session], controllers.User_area);

module.exports = router;
