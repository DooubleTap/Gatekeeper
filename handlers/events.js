const fs = require("fs");

let array = [];
module.exports = async (client) => {
  const folders = fs.readdirSync(__dirname.replace("handlers", "events"));
  for (const folder of folders) {
    const eventFolders = fs
      .readdirSync(`./events/${folder}/`)
      .filter((file) => file.endsWith(".js"));
    for (const file of eventFolders) {
      const eventFile = require(`../events/${folder}/${file}`);
      try {
        if (file.event && typeof file.event !== "string") {
          array.push({
            File: file.replace(".js", ""),
            Status: `❌ -> Property event should be string.`,
          });
          continue;
        }
        eventFile.event = eventFile.event || file.replace(".js", "");

        client.on(eventFile.event, eventFile.run.bind(null, client));

        array.push({ File: file.replace(".js", ""), Status: "✅" });
      } catch (error) {
        console.log(error);
        array.push({
          File: file.replace(".js", ""),
          Status: `❌ -> Error while loading event`,
        });
      }
    }
  }
  console.table(array);
};
