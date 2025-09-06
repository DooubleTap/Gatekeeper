//Add this to every files
// const { t } = require("../../handlers/locale");

const fs = require("fs");
const path = require("path");
const config = require("../config.json");

const locales = {};

// Load all JSON files in /locales
fs.readdirSync(path.join(__dirname, "../locales")).forEach(file => {
    if (file.endsWith(".json")) {
        const localeName = file.split(".")[0];
        locales[localeName] = require(path.join(__dirname, "../locales", file));
    }
});

// Translation function
function t(key, locale) {
    locale = locale || config.defaultLocale;
    return locales[locale]?.[key] || locales["en"]?.[key] || key;
}

module.exports = { t };
