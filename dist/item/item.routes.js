"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("./item.controller");
const router = express_1.default.Router();
router.get("/", item_controller_1.getAllItems);
router.post("/", item_controller_1.createItem);
router.patch("/:id", item_controller_1.updateItem);
router.delete("/:id", item_controller_1.deleteItem);
exports.default = router;
