import express from "express";

import baseConfig from "./configs/baseConfig.js";
import indexRoute from "./routes/indexRoute.js";


const addon = express();
addon.use("/", indexRoute);
addon.listen(baseConfig.PORT, () => { console.log(`Add-on Repository URL: ${baseConfig.BASE_URL}/manifest.json`); });