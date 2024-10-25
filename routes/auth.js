const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => {
      res.status(200).json({ message: "Sign Up Successfull" });
    });
  } catch (error) {
    res.status(200).json({ message: "User Already Existed" });
  }
});

// SIGN IN

// router.post("/signin", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       res.status(200).json({ message: "Please Sign Up First" });
//     }
//     const isPasswordCorrect = bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect) {
//       res.status(200).json({ message: "Password is Not Correct" });
//     }
//     const { password, ...others } = user._doc;
//     res.status(200).json({ others });
//   } catch (error) {
//     res.status(200).json({ message: "User Already Existed" });
//   }
// });

router.post("/signin", async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please Sign Up first." });
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    // Exclude password from the response
    const { password, ...userData } = user._doc;

    // Send a success response with user data
    return res.status(200).json({ user: userData });
  } catch (error) {
    // Log the error and send a generic error response
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

module.exports = router;
