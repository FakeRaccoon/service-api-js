const Part = require("../models/part");
const request = require("request");

const getPart = async (req, res) => {
  try {
    const item = req.params.item;
    const options = {
      url: "http://192.168.0.250:4948/api/Items/ProductDropDown",
      headers: {
        "Authorization": `Bearer ${process.env.AMS_TOKEN}`,
        "search": item || 'yanmar'
      }
    };
    request(options, function (error, response, body) {
      console.error("error:", error);
      // const data = JSON.parse(body);
      // data.forEach( function (element) {
      //   console.log(element.itemCode);
      // });
     
      return res.status(200).json(JSON.parse(response.body));
    });
    // const part = await Part.findAll();
    // return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getFromHeroku = async (req, res) => {
  try {
    const options = {
      url: "http://localhost:3000/cache",
      headers: {
        "If-None-Match": `W/"1363-kRzSPSQbAbAVptbnQkDvogw5CUM"`,
      },
    };
    request(options, function (error, response, body) {
      console.error("error:", error);
      console.log(response.headers['etag'])
      const data = JSON.parse(body)
      data.forEach(async function (element) {
        console.log(element.itemCode)
      })
      return res.status(200).json(JSON.parse(body));
    });
    // const part = await Part.findAll();
    // return res.status(200).json({ result: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getPart, getFromHeroku };
