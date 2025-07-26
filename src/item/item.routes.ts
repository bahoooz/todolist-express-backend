import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "./item.controller";

const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
