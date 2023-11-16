import { Client, createClient } from "@libsql/client";

export class DBConnector {
	db: Client;

	constructor() {
		const dbUrl = process.env.DB_URL;
		const dbAuthToken = process.env.DB_TOKEN;
		if (dbUrl === undefined || dbAuthToken === undefined) {
			throw new Error(
				"DB_URL and DB_AUTH_TOKEN must be set in the environment"
			);
		}
		this.db = createClient({
			url: dbUrl,
			authToken: dbAuthToken,
		});
	}

	async getStations() {
		const res = await this.db.execute("SELECT * FROM train_stations");
		return res;
	}
}
