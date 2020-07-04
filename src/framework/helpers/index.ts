let { ApolloError } = require("apollo-server");
import fs from "fs";
import { IConfiguration } from "../types/configuration";
var bcrypt = require("bcryptjs");

export const generateError = (e: any, statusCode: Number = 404) => {
  return new ApolloError(e.message);
};

export const getDirectoriesInFolder = (path: string) => {
  return fs.readdirSync(path).filter(function (file: any) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
};

export const randomString = (len, charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
  charSet = charSet;
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

export const filesInAFolder = (path: string) => {
  return fs.readdirSync(path);
};

export const exists = (path: any) => {
  try {
    fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
};

export const appendToFileSync = function (path: string, content: string) {
  // try {
  fs.appendFileSync(path, content);
  //   return true;
  // } catch (e) {
  //   return false;
  // }
};

export const createEmptyFile = function (path: string, cb: Function) {
  fs.writeFile(path, "", function (err) {
    if (err) throw err;
    cb();
  });
};

export const checkIfModuleIsValid = function (object: IConfiguration) {
  if (!module) {
    console.log("Module must be object");
    return false;
  }
  if (module && module.constructor !== Object) {
    console.log("Module must be object");
    return false;
  }
  return true;
};

export const deleteFile = async (path: string, cb: Function) => {
  if (exists(path)) {
    try {
      fs.unlink(path, function (err) {
        cb();
      });
      return true;
    } catch (e) {
      return false;
    }
  } else {
    return true;
  }
};

export const generateHashPassword = (password: string) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
export const verifyPassword = async (tryingPassword, storedPassword) => {
  return await bcrypt.compareSync(tryingPassword, storedPassword);
};

export const firstLetterLowerCase = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export const identityColumn = () => {
  const { dbDialect } = process.env;
  const isSQL = dbDialect.includes("sql");
  return isSQL ? "id" : "_id";
};
