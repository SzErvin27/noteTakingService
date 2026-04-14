import { Note } from "../models/note";
import { NotesRepository } from "../repositories/notesRepository";

// Service layer for note operations
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  // Create a new note or update an existing one
  async createOrUpdateNote(
    id: string,
    content: string,
    favorite?: boolean
  ): Promise<{ note: Note; created: boolean }> {
    const trimmedId = id.trim();

    // Validate id
    if (!trimmedId) {
      throw new Error("Note id must not be empty.");
    }

    // Validate content
    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Note content must not be empty.");
    }

    // Check if the note already exists
    const existing = await this.notesRepository.getById(trimmedId);

    // Create or update the note
    const note: Note = {
      id: trimmedId,
      content,
      favorite: favorite ?? existing?.favorite ?? false
    };

    await this.notesRepository.save(note);

    return {
      note,
      created: existing === null
    };
  }

  // Get a note by its ID
  async getNoteById(id: string): Promise<Note> {
    const trimmedId = id.trim();

    if (!trimmedId) {
      throw new Error("Note id must not be empty.");
    }

    const note = await this.notesRepository.getById(trimmedId);

    if (!note) {
      throw new Error("Note not found.");
    }

    return note;
  }

  // Get all note IDs
  async getAllNoteIds(): Promise<string[]> {
    return this.notesRepository.getAllIds();
  }

  // Get all favorite notes
  async getFavoriteNotes(): Promise<Note[]> {
    return this.notesRepository.getFavorites();
  }
}