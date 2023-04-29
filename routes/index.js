const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apiCache = require("apicache");

const API_KEY_VALUE = process.env.API_KEY_VALUE;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_BASE_URL = process.env.API_BASE_URL;
let cache = apiCache.middleware;

router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const reqParams = url.parse(req.url, true).query;
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...reqParams,
    });
    const reqUrl = `${API_BASE_URL}?${params}`;
    if (process.env.NODE_ENV !== "production") {
      console.log("Request: ", reqUrl);
    }
    const apiRes = await needle("get", reqUrl);
    const data = apiRes.body;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
