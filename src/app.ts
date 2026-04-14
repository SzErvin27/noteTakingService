import express from "express";
import { NotesRepository } from "./repositories/notesRepository";
import { NotesService } from "./services/notesService";
import { NotesController } from "./controllers/notesController";
import { createNotesRouter } from "./routes/notesRoutes";

// Application entry point
const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize layers
const notesRepository = new NotesRepository();
const notesService = new NotesService(notesRepository);
const notesController = new NotesController(notesService);

app.use(createNotesRouter(notesController));

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});