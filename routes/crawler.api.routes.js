var express = require("express");
const path = require("path");
var router = express.Router();
/* modules */
var Crawler = require("../modules/axios/crawler.axios");

/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("/getAllImagesByUrl/:url", function (req, res, next) {
  let { url } = req.params;

  if (url) {
    Crawler.getAllImages(url)
      .then((result) => {
        /* console.log(result); */
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("Url is required");
  }
});

router.post("/downloadImagesByList", function (req, res, next) {
  let arrImages = req.body;

  if (arrImages && arrImages.length > 0) {
    Crawler.getDownloadAllImagesByList(arrImages)
      .then((result) => {
        /* console.log(result); */
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("No images were passed, or array lenght is 0'");
  }
});

module.exports = router;
