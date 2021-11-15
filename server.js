require("dotenv").config();
const open = require("open");
/* MAIN Express */
const express = require("express");
const app = express();
var router = express.Router();
const path = require("path");
/* REQUEST MODULES */
var request = require("request");
/* ROUTERS */
var CrawlerAPI = require("./routes/crawler.api.routes");

/* loggers and extras */
var logger = require("morgan");
var bodyParser = require("body-parser");
var exphbs = require("./lib/helpers");
var extras = require("./lib/extras");

app.use(logger(process.env.MORGANLEVEL));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* SWAGGER */
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

/* STATIC REACT BUILD */
// app.use(express.static(path.resolve(__dirname, "build"), optionsStatic));

// /* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
// router.get("/", ensureAuthenticated, function (req, res, next) {
//     var i = path.resolve(__dirname, "build/index.html");
//     res
//         .sendFile(i, function (err) {
//             if (err) {
//                 console.log('INDEX.HTML NOT FOUND ERROR!');
//                 res
//                     .status(500)
//                     .send(err);
//             }
//         });
// });

/* Routes */
app.use(router);
app.use("/api", CrawlerAPI);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

process.env.PORT = process.env.PORT || 5000;
app.listen(process.env.PORT);
extras.VerbalHelper();

if (process.env.enviroment === "DEV") {
  // opens the url in the default browser
  open(`http://localhost:${process.env.PORT}/api-docs`);
}
