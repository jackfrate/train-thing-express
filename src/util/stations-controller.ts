import { Client, Row, createClient } from "@libsql/client";

export class DBConnector {
	db: Client;

	constructor() {
		const dbUrl = process.env.DB_URL;
		const dbAuthToken = process.env.DB_TOKEN;
		if (dbUrl === undefined || dbAuthToken === undefined) {
			throw new Error(
				"DB_URL and DB_AUTH_TOKEN must be set in the environment",
			);
		}
		this.db = createClient({
			url: dbUrl,
			authToken: dbAuthToken,
		});
	}

	async getStations() {
		const res: {
			columns: string[];
			columnTypes: string[];
			rows: Row[];
		} = await this.db.execute("SELECT * FROM train_stations");

		const rowsResponse = res.rows.map((row) => {
			const station_name = row[1] as string;
			const id = row[0] as string;

			return {
				station_name,
				id,
			};
		});

		return rowsResponse;
	}
}
