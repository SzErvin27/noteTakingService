import { Router } from "express";
import { NotesController } from "../controllers/notesController";

// Defines the routes for note operations
export function createNotesRouter(notesController: NotesController): Router {
  const router = Router();

  router.get("/notes/favorites", notesController.getFavoriteNotes);
  router.get("/notes", notesController.getAllNoteIds);
  router.get("/notes/:id", notesController.getNoteById);
  router.put("/notes/:id", notesController.createOrUpdateNote);

  return router;
}