import { connectDB } from "./db.js";
import { PORT } from "./config.js";
import { server } from "./app.js";

connectDB();
server.listen(PORT);
console.log("Server on port", PORT);
