import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import trainTimes from "./trainTimes";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
	res.json({
		message: "API - 👋🌎🌍🌏",
	});
});

router.use("/trainTimes", trainTimes);

export default router;
