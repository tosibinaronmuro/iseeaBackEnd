const CustomError = require("./custom-error");
const Unauthenticated = require("./unauthenticated");
const BadRequest = require("./bad-request");
const NotFound = require("./not-found");

module.exports = { CustomError, BadRequest, Unauthenticated, NotFound };
