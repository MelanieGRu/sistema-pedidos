import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { useState } from "react";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally, date) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (next, ext, path, form) => {
      return path.originalFilename;
    };
  }

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public" + "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public" + "/images"));
  }
  const date = Date.now().toString();
  const archivo = await readFile(req, true, date);
  res.json({ nombre: archivo.files.myImage["newFilename"] });
};

export default handler;
