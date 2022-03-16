import { Pool } from "pg";

const connectionString = 'postgres://nagwlcyr:KoE7Kgg3KWhvI67qrZLJOqKrYd2R5IpS@tuffi.db.elephantsql.com/nagwlcyr';

const db = new Pool({ connectionString });

export default db;
