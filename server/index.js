const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { mongoose } = require("mongoose");
const UserModel = require("./models/User");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// connect to mongodb database
const CONNECTION_URL = process.env.MONGODB_URI;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    regId,
    gender,
    country,
    submission,
  } = req.body;

  try {
    const existinguser = await UserModel.findOne({ email });

    if (existinguser) {
      return res.status(409).json({ message: "User already Exist." });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      regId,
      gender,
      country,
      submission,
    });

    res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await UserModel.findOne({ email });

    if (!existinguser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);

    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      result: existinguser,
      token,
      message: "Successfully logged in.",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
