const dbconnection = require("../db/dbConfig.js");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !lastname || !firstname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide  all  value" });
  }

  try {
    const [user] = await dbconnection.query(
      "SELECT username,userid FROM users WHERE username=? or email=?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 chracters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await dbconnection.query(
      "INSERT INTO users(firstname,lastname,email,username,password) VALUES(?,?,?,?,?)",
      [firstname, lastname, email, username, hashedpassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
}

async function logIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required inputs" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username,password,userid FROM users WHERE email=?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    //jwt generation
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(StatusCodes.OK).json({
      msg: "user successfuly log in ",
      token: token,
      userName: username,
      userid,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
}
function checkUser(req, res) {
  const { userid, username } = req.user;

  res.status(StatusCodes.OK).json({ username, userid });
}
module.exports = { register, logIn, checkUser };
