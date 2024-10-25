const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://aquibsswapra:PM6g2naQk1OY0aeB@cluster0.eaeem.mongodb.net/"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    res.status(400).json({ message: "Not Connected" });
  }
};

conn();
