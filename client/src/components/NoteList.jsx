import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import EditorModal from "./Editor";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const token=localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading notes...</p>;

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
            onDelete={() => {
              // later: delete API
            }}
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
