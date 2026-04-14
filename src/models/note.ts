// A single note entity
export type Note = {
  id: string;
  content: string;
  favorite: boolean;
};

// Storage format: ID -> Note mapping
export type NotesMap = Record<string, Note>;