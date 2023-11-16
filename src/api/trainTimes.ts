import express from "express";
import { ArrivalsResponse } from "../interfaces/train/CTA.types";
import { makeTrainTimesTypeNotSuck } from "../util/remap-arrivals-response";
import { DBConnector } from "../util/stations-controller";

const router = express.Router();

router.get("/timesAtStop/:id", async (req, res) => {
	const stopId = req.params.id;
	const CTA_API_KEY = process.env.CTA_API_KEY;

	const url = `${process.env.CTA_URL}/ttarrivals.aspx?key=${CTA_API_KEY}&mapid=${stopId}&outputType=JSON`;
	const ctaResponse = await fetch(url);
	const ctaResponseJson = (await ctaResponse.json()) as ArrivalsResponse;

	const convertedValue = makeTrainTimesTypeNotSuck(ctaResponseJson.ctatt);

	res.json(convertedValue);
});

router.get("/stations", async (req, res) => {
	// TODO: At first I wanted to replace this with a real
	// db connector, but I think having the JSON in the server
	// will make this faster
	const connector = new DBConnector();

	const stations = await connector.getStations();
	return res.json(stations);
});

export default router;
