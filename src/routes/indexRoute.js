import express from "express";

import indexController from "../controllers/indexController.js";
import corsMiddleware from "../middlewares/corsMiddleware.js";
import cssMiddleware from "../middlewares/cssMiddleware.js";
import wrapTryCatch from "../utils/wrapTryCatch.js";


const router = express.Router();
router.get("/", cssMiddleware, wrapTryCatch(indexController.getIndex));
router.get("/README.md", wrapTryCatch(indexController.getReadMe));
router.get("/manifest.json", corsMiddleware, wrapTryCatch(indexController.getManifest));
router.get("/:subtitleID.srt", wrapTryCatch(indexController.getSubtitleSrt));
router.get("/subtitles/:contentType/:compoundID/:extraArgs.json", corsMiddleware, wrapTryCatch(indexController.getSubtitlesList));


export default router;