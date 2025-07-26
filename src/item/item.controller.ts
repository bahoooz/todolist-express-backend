import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const getAllItems = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const items = await prisma.item.findMany();
    return res.json({ message: "All items", items }).status(200);
  } catch (error) {
    console.error("GET /items error:", error);
    return res
      .json({
        error: "Internal Server Error",
      })
      .status(500);
  }
};

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, quantity, color } = req.body;

    if (!title) return res.json({ error: "title is required" }).status(400);

    const newItem = await prisma.item.create({
      data: {
        title,
        quantity,
        color,
      },
    });

    return res
      .json({ message: "Item created successfully :", newItem })
      .status(201);
  } catch (error) {
    console.error("POST /items/error :", error);
    return res.json({ error: "Internal Server Error" }).status(500);
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, quantity, color } = req.body;

    const itemId = Number(id);
    if (isNaN(itemId)) return res.json({ error: "Invalid ID" }).status(400);

    if (!title) return res.json({ error: "Title is required" }).status(400);

    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!existingItem)
      return res.json({ error: "Item doesn't exist" }).status(404);

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        title,
        quantity,
        color,
      },
    });

    return res
      .json({ message: "Item updated successfully", updatedItem })
      .status(200);
  } catch (error: any) {
    console.error("PATCH /items/:id error :", error);

    if (error.code === "P2025")
      return res.json({ error: "Item not found" }).status(400);
  }

  return res.status(500).json({ error: "Internal Server Error" });
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const itemId = Number(id);
    if (isNaN(itemId)) return res.json({ error: "Invalid ID" }).status(400);

    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!existingItem)
      return res.json({ error: "Item doesn't exist" }).status(404);

    const deletedItem = await prisma.item.delete({ where: { id: itemId } });

    return res
      .json({ message: "User deleted successfully", deleteItem })
      .status(200);
  } catch (error: any) {
    console.error("DELETE /items/:id error :", error);

    if (error.code === "P2025")
      return res.json({ error: "Item not found" }).status(400);

    return res.json({ error: "Internal Server Error" }).status(500);
  }
};
