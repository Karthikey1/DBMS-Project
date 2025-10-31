import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/post", postRoutes);
app.use("/api/event", eventRoutes);

app.listen(process.env.PORT || 8080, () => console.log("Server running"));
