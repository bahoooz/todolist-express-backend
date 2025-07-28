import express from "express";
import itemRoutes from "./item/item.routes";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
