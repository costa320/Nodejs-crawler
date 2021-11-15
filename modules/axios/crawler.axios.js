var express = require("express");
const path = require("path");
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");
var fs = require("fs");
/* MODULES */
var crawler = require("../functions/crawler.logic");

const httpsAgent = new https.Agent({ keepAlive: true });

exports.getAllImages = (url = "") => {
  return new Promise((result, reject) => {
    axios
      .get(url, {
        httpsAgent,
      })
      .then((res) => {
        /* console.log(res.data); */
        if (res.data && res.status === 200) {
          result(crawler.analizeHtml(res, url));
        } else {
          reject("ERROR in <downloadImages>");
        }
      })
      .catch((err) => {
        console.error(err);
      });

    /* res({ downloaded: 35 }); */
  });
};

exports.getDownloadAllImagesByList = (arrImages = []) => {
  let objCompleted = {
    downloaded: 0,
    inError: 0,
  };
  return new Promise((result, reject) => {
    try {
      arrImages.forEach((el, i) => {
        let { nameSpace, url } = el;
        const _path = path.resolve(
          __dirname,
          "../../downloads",
          `image-${+new Date()}.jpg`
        );
        const _writer = fs.createWriteStream(_path);
        axios({
          url,
          method: "GET",
          responseType: "stream",
        })
          .then((response) => {
            if (response.data) {
              response.data.pipe(_writer);
              objCompleted.downloaded += 1;
            }
            /* if its last element return results */
            if (i === arrImages.length - 1) {
              result(objCompleted);
            }
          })
          .catch((err) => {
            objCompleted.inError += 1;
            console.error(err);
          });
      });
    } catch {
      reject(objCompleted);
    }
  });
};
