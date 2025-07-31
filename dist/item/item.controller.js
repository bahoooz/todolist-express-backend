"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = exports.getAllItems = void 0;
const prisma_1 = require("../lib/prisma");
const getAllItems = async (_req, res) => {
    try {
        const items = await prisma_1.prisma.item.findMany();
        return res.json({ message: "All items", items }).status(200);
    }
    catch (error) {
        console.error("GET /items error:", error);
        return res
            .json({
            error: "Internal Server Error",
        })
            .status(500);
    }
};
exports.getAllItems = getAllItems;
const createItem = async (req, res) => {
    try {
        const { title, quantity, color } = req.body;
        if (!title)
            return res.json({ error: "title is required" }).status(400);
        const newItem = await prisma_1.prisma.item.create({
            data: {
                title,
                quantity,
                color,
            },
        });
        return res
            .json({ message: "Item created successfully :", newItem })
            .status(201);
    }
    catch (error) {
        console.error("POST /items/error :", error);
        return res.json({ error: "Internal Server Error" }).status(500);
    }
};
exports.createItem = createItem;
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, quantity, color, completed } = req.body;
        const itemId = Number(id);
        if (isNaN(itemId))
            return res.json({ error: "Invalid ID" }).status(400);
        const existingItem = await prisma_1.prisma.item.findUnique({
            where: { id: itemId },
        });
        if (!existingItem)
            return res.json({ error: "Item doesn't exist" }).status(404);
        const updatedItem = await prisma_1.prisma.item.update({
            where: { id: itemId },
            data: {
                title,
                quantity,
                color,
                completed
            },
        });
        return res
            .json({ message: "Item updated successfully", updatedItem })
            .status(200);
    }
    catch (error) {
        console.error("PATCH /items/:id error :", error);
        if (error.code === "P2025")
            return res.json({ error: "Item not found" }).status(400);
    }
    return res.status(500).json({ error: "Internal Server Error" });
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const itemId = Number(id);
        if (isNaN(itemId))
            return res.json({ error: "Invalid ID" }).status(400);
        const existingItem = await prisma_1.prisma.item.findUnique({
            where: { id: itemId },
        });
        if (!existingItem)
            return res.json({ error: "Item doesn't exist" }).status(404);
        const deletedItem = await prisma_1.prisma.item.delete({ where: { id: itemId } });
        return res
            .json({ message: "Item deleted successfully", deletedItem })
            .status(200);
    }
    catch (error) {
        console.error("DELETE /items/:id error :", error);
        if (error.code === "P2025")
            return res.json({ error: "Item not found" }).status(400);
        return res.json({ error: "Internal Server Error" }).status(500);
    }
};
exports.deleteItem = deleteItem;
