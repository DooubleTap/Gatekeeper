const fs = require("fs");
const { t } = require("./locale"); // Make sure your locale handler exports `t`

let array = [];

module.exports = async (client) => {
  const folders = fs.readdirSync(__dirname.replace("handlers", "events"));

  for (const folder of folders) {
    const eventFiles = fs
      .readdirSync(`./events/${folder}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const eventFile = require(`../events/${folder}/${file}`);

      try {
        // Check that event property is a string
        if (eventFile.event && typeof eventFile.event !== "string") {
          array.push({
            File: file.replace(".js", ""),
            Status: t("events_invalid_event_property"),
          });
          continue;
        }

        eventFile.event = eventFile.event || file.replace(".js", "");

        client.on(eventFile.event, eventFile.run.bind(null, client));

        array.push({
          File: file.replace(".js", ""),
          Status: t("events_loaded_success"),
        });
      } catch (error) {
        console.error(error);
        array.push({
          File: file.replace(".js", ""),
          Status: t("events_load_error"),
        });
      }
    }
  }

  console.table(array);
};
