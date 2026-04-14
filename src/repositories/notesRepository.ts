import { promises as fs } from "node:fs";
import path from "node:path";
import { Note, NotesMap } from "../models/note";

// Repository for storing notes
export class NotesRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "data", "notes.json");
  }

  //Check if the storage file exists, if not create it with an empty object
  private async doesFileExist(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeFile(this.filePath, JSON.stringify({}, null, 2), "utf-8");
    }
  }

  // Read all notes from the storage
  private async readAll(): Promise<NotesMap> {
    await this.doesFileExist();

    const raw = await fs.readFile(this.filePath, "utf-8");

    if (!raw.trim()) {
      return {};
    }

    try {
      return JSON.parse(raw) as NotesMap;
    } catch {
      throw new Error("Storage file is corrupted.");
    }
  }

  // Write all notes back to the storage
  private async writeAll(notes: NotesMap): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(notes, null, 2), "utf-8");
  }

  // Get all notes as an array
  async getAllNotes(): Promise<Note[]> {
    const notes = await this.readAll();
    return Object.values(notes);
  }

  // Get a note by its ID
  async getById(id: string): Promise<Note | null> {
    const notes = await this.readAll();
    return notes[id] ?? null;
  }

  // Save or update a note
  async save(note: Note): Promise<void> {
    const notes = await this.readAll();
    notes[note.id] = note;
    await this.writeAll(notes);
  }

  // Get all note IDs
  async getAllIds(): Promise<string[]> {
    const notes = await this.readAll();
    return Object.keys(notes);
  }

  // Get all favorite notes
  async getFavorites(): Promise<Note[]> {
    const notes = await this.readAll();
    return Object.values(notes).filter((note) => note.favorite);
  }
}
