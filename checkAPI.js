const axios = require("axios");
const { log } = require("./utils"); // Adjust the path as necessary
const settings = require("./config/config");

const urlChecking = "https://raw.githubusercontent.com/zainarain279/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  console.log("Checking api...".blue);
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      log("No change in api!", "success");
      return result;
    }
  } else {
    return {
      endpoint: settings.BASE_URL,
      message: "Using default base URL", // "Zain" အစား အသုံးဝင်တဲ့ မက်ဆေ့ချ်
    };
  }
}

async function getBaseApi(url) {
  try {
    const response = await axios.get(url);
    const content = response.data;
    if (content?.magic) {
      return { endpoint: content.magic, message: content.copyright };
    } else {
      return {
        endpoint: null,
        message: "API endpoint not found in remote config", // "Zain" အစား ရှင်းတဲ့ မက်ဆေ့ချ်
      };
    }
  } catch (e) {
    return {
      endpoint: null,
      message: "Failed to fetch API endpoint config", // "Zain" အစား error မက်ဆေ့ချ်
    };
  }
}

module.exports = { checkBaseUrl };
