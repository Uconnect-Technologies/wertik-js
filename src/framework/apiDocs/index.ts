import fs from "fs";
import { exists, deleteFile, createEmptyFile, appendToFileSync } from "./../helpers/index";
import { IDocServerConfiguration } from "./../types/configuration";

let dirname = __dirname;
let docFileSource = `${dirname}/docs.js`;

export const addContentsToDoc = async function(doc: string) {
  setTimeout(() => {
    doc = doc.replace("first________", "/**");
    doc = doc.replace("last________", "*/");
    appendToFileSync(docFileSource, doc);
  }, 600);
};

export const resetDocFile = async function() {
  deleteDocFile(function() {
    createEmptyFile(docFileSource, function() {
      addContentsToDoc("//empty file");
    });
  });
};

export const deleteDocFile = async function(cb: Function) {
  if (exists(docFileSource)) {
    deleteFile(docFileSource, cb);
  } else {
    cb();
  }
};
