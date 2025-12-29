import NoteCard from "./NoteCard";

const notes = [
  {
    id: 1,
    content:
      "Fix email extraction from JWT token in Spring Security filter and update NoteService accordingly.",
    createdAt: "28 Dec 2025",
  },
  {
    id: 2,
    content:
      "Implement user-note relationship, CRUD APIs, pagination, and soft delete support.",
    createdAt: "27 Dec 2025",
  },
];

const NoteList = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          content={note.content}
          createdAt={note.createdAt}
          onEdit={() => console.log("Edit", note.id)}
          onDelete={() => console.log("Delete", note.id)}
        />
      ))}
    </div>
  );
};

export default NoteList;
