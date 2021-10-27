const CronJob = require("cron").CronJob;
const Item = require("./models/item");
const Cache = require("./models/cache");
const request = require("request");

const cron = new CronJob("*/1 * * * *", async function () {
    const etag = await Cache.findOne({});
    const options = {
      url: "http://localhost:3000/cache",
      headers: {
        "If-None-Match": `${etag.etag}`,
      },
    };
    request(options, async function (error, response, body) {
      console.error("error:", error);
      if (response.statusCode == 304) {
        console.log("No new data");
        // console.log(response.headers['etag']);
      } else {
        await Cache.update({ etag: response.headers['etag'] }, { where: { id: 1 } })
        const data = JSON.parse(body) 
        data.forEach(async function (element) {
           await Item.findOrCreate({ where: { atana_id: element.itemId }, defaults: {
            atana_id: element.itemId,
            item_code: element.itemCode,
            item_name: element.itemName,
            item_alias: element.itemAlias,
            updated_at: element.lastUpdate
            } 
          });
        });
      }
    });
  },
  null,
  true,
  "Asia/Jakarta"
);

module.exports = cron;
