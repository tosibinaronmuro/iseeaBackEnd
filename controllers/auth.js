const jwt = require("jsonwebtoken");
const {
  CustomError,
  BadRequest,
  Unauthenticated,
  NotFound,
} = require("../errors");
const User = require("../model/user");
const ResetToken = require("../model/reset-token");
const { StatusCodes } = require("http-status-codes");
// const crypto = require("crypto");
const {
  mailTransport,
  gmailTemplate,
  generateOTP,
  gmailPlainTemplate,
} = require("../utils/mail");
const { createRandomBytes } = require("../utils/helper");
const session = require("express-session");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("please provide name, email and password");
  }
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequest("Email already exists");
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // const oneDay = 1000 * 60 * 60 * 24;

  //   res.cookie("token", token, {
  //     httpOnly: true,
  //     expires: new Date(Date.now() + oneDay),
  //     // secure: process.env.NODE_ENV === 'production',
  //     signed: true,
  //   });
  req.session.jwt = token;
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("user does not exist");
  }
  const token = user.createJWT();
  const oneDay = 1000 * 60 * 60 * 24;

  //   res.cookie("token", token, {
  //     httpOnly: true,
  //     expires: new Date(Date.now() + oneDay),
  //     // secure: process.env.NODE_ENV === 'production',
  //     signed: true,
  //   });
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("invalid password");
  }
  req.session.jwt = token;
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const logout = async (req, res) => {
  req.session.destroy(); // Clear the session
  res.clearCookie("jwt"); // Clear the JWT cookie

  res.send("Logged out successfully");
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("no email provided");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Email not found");
  }
  const token = await ResetToken.findOne({ owner: user._id });

  if (token) {
    throw new BadRequest("retry after an hour");
  }

  const randomBytes = await createRandomBytes();

  await ResetToken.create({ owner: user._id, token: randomBytes });
  // await resetToken.save();

  const mail_configs = {
    from: process.env.MY_EMAIL,
    to: user.email,
    subject: "Reset Password for I.S.E.E.A",
    html: gmailTemplate(
      `http://localhost:3000/password/reset?token=${randomBytes}&id=${user._id}`,
      user.name
    ),
     
  };
  mailTransport.sendMail(mail_configs);

  res.json({ success: true, msg: "Reset link has been successfully sent to your email account" });
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new BadRequest("Email not found!");
  }

  const isSamePassword = await user.comparePasswords(password);
  console.log(isSamePassword);
  if (isSamePassword) {
    throw new BadRequest(
      "new password cannot be the same as the old password!"
    );
  }
  //  password validation
  user.password = password;
  await user.save();
  await ResetToken.findOneAndDelete({ owner: user._id });
  const mail_configs = {
    from: process.env.MY_EMAIL,
    to: user.email,
    subject: "Reset Password for I.S.E.E.A",

    html: gmailPlainTemplate(`https://iseea.vercel.app/`, user.name),
  };
  mailTransport.sendMail(mail_configs);
  res.json({ success: true, msg: "password reset successfully" });
};

module.exports = { register, login, logout, forgotPassword, resetPassword };
