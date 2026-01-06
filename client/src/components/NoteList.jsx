import { useState } from "react";
import NoteCard from "./NoteCard";
import EditorModal from "./Editor";

const notes = [
  {
    id: 1,
    content: "Fix email extraction from JWT token in Spring Security filter.",
    createdAt: "28 Dec 2025",
  },
  {
    id: 2,
    content: "Fix email extraction from JWT token in Spring Security filter.",
    createdAt: "28 Dec 2025",
  },
];

const NoteList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            content={note.content}
            createdAt={note.createdAt}
            onEdit={() => {
              setContent(note.content);
              setIsOpen(true);
            }}
            onDelete={() => {}}
          />
        ))}
      </div>

      <EditorModal
        isOpen={isOpen}
        content={content}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default NoteList;
