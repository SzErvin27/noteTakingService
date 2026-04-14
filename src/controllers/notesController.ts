import { Request, Response } from "express";
import { NotesService } from "../services/notesService";

// Cpontroller for handling HTTP requests
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Create a new note or update an existing one
  createOrUpdateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const idParam = req.params.id;

      if (typeof idParam !== "string") {
        res.status(400).json({ error: "Invalid note id." });
        return;
      }

      const id = idParam;

      const { content } = req.body as { content?: string };
      
      const favQuery = req.query.fav;
      let favorite: boolean | undefined;

      if (favQuery !== undefined) {
        if (favQuery === "true") {
          favorite = true;
        } else if (favQuery === "false") {
          favorite = false;
        } else {
          res.status(400).json({ error: "Invalid fav query parameter." });
          return;
        }
      }

      const result = await this.notesService.createOrUpdateNote(
        id,
        content ?? "",
        favorite,
      );

      res.status(result.created ? 201 : 200).json(result.note);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error.";

      if (
        message === "Note content must not be empty." ||
        message === "Note id must not be empty."
      ) {
        res.status(400).json({ error: message });
        return;
      }

      res.status(500).json({ error: message });
    }
  };

  // Get a note by its ID
  getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const idParam = req.params.id;

      if (typeof idParam !== "string") {
        res.status(400).json({ error: "Invalid note id." });
        return;
      }

      const id = idParam;
      const note = await this.notesService.getNoteById(id);
      res.status(200).json(note);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error.";

      if (message === "Note not found.") {
        res.status(404).json({ error: message });
        return;
      }

      if (message === "Note id must not be empty.") {
        res.status(400).json({ error: message });
        return;
      }

      res.status(500).json({ error: message });
    }
  };

  // Get all note IDs
  getAllNoteIds = async (_req: Request, res: Response): Promise<void> => {
    try {
      const ids = await this.notesService.getAllNoteIds();
      res.status(200).json({ noteIds: ids });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error.";
      res.status(500).json({ error: message });
    }
  };

  // Get all favorite notes
  getFavoriteNotes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const favorites = await this.notesService.getFavoriteNotes();
      res.status(200).json({ favorites });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Internal server error.";
      res.status(500).json({ error: message });
    }
  };
}
