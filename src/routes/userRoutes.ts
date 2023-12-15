import express, { Request, Response } from "express";
import Model from "../models/userModel";

const router = express.Router();

// Post Method
router.post("/guardar", async (req: Request, res: Response) => {
  try {
    const data = new Model({
      name: req.body.name, // Tomar el nombre del cuerpo de la solicitud
      age: req.body.age,
    });
    const dataToSave = await data.save();
    res.status(201).json({ message: "Usuario creado exitosamente", data: dataToSave });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Method
router.get("/ver-todos", async (req: Request, res: Response) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get by ID Method
router.get("/usuario/:id", async (req: Request, res: Response) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update by ID Method
router.patch("/modificar/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete by ID Method
router.delete("/eliminar/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
