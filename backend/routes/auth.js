const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");


const JWT_SECRET = "HEisAGood$Boy";

//ROUTE 1: Create a User using:  POST "/api/auth/createuser". No login required Auth
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Your password must be at list 5 characters").isLength({
      min: 5,
    }),
    body("name", "Enter a valid name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ success, errors: errors.array() });
    }
    try {
      //Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      //Create New User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      
      const authtoker = jwt.sign({ data }, JWT_SECRET);
      success = true;
      res.json({ success, authtoken: authtoker });
    } catch (error) {
      console.error(error.message);
      res.status(401).send({ success, errors: "Some Error Occured!!" });
    }
  }
);

//ROUTE 2: Authenticate a User using:  POST "/api/auth/login". Dosen't required Auth

router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password Cann't Be blank.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(500)
          .json({
            error: "Please Try to login with correct user name & password!",
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success = false;
        return res
          .status(500)
          .json({
            success,
            error: "Please Try to login with correct user name & password!",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign({ data }, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(401).send({ errors: "Internel Server Error!" });
    }
  }
);

//ROUTE 3: Get LoggedIn User Details:  POST "/api/auth/getuser". Dosen't required Auth
router.post( "/getuser", fetchuser, async (req, res) => {
    try {
      const data = req.user.data.user;
      userId = data.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ errors: "Internel Server Error!" });
    }
  }
);

module.exports = router;
