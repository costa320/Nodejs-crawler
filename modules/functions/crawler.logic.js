const cheerio = require("cheerio");
var $ = require("jquery");

exports.analizeHtml = (response, url) => {
  return new Promise((res, rej) => {
    const $ = cheerio.load(response.data);

    var images = [];
    $("img").each(function () {
      let { attribs, namespace } = this;

      if (attribs.src) {
        images.push({
          nameSpace: namespace,
          url:
            attribs.src.substring(0, 1) === "/"
              ? url + attribs.src
              : attribs.src,
        });
      }
    });
    $("*").each(function () {
      var bg = $(this).css("background-image");
      if (bg && bg != "none") {
        images.push({
          nameSpace: namespace,
          url: bg.substring(0, 1) === "/" ? url + bg : bg,
        });
      }
    });

    res(images);
  });
};
