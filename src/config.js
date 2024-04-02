import dotenv from "dotenv";

dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "something secret";

export const PORT = process.env.PORT || 4000;

export const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/bd_sisadesc";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const HOST_MYSQL = process.env.HOST_MYSQL || "localhost";

export const USER_MYSQL = process.env.USER_MYSQL || "root";

export const PASSWORD_MYSQL = process.env.PASSWORD_MYSQL || "";

export const DATABASE_MYSQL = process.env.DATABASE_MYSQL || "bd_sisadesc";

export const PORT_MYSQL = process.env.PORT_MYSQL || 3306;