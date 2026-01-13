import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import EditorModal from "./Editor";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit (FIXED)
  const handleEdit = (note) => {
    setActiveNote(note);
    setIsOpen(true);
  };

  // ✅ Save (FULL HTML)
  const handleSave = async (html) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notes/${activeNote.id}`,
        { content: html },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ res.data is FULL updated note
      setNotes(prev =>
        prev.map(n => (n.id === activeNote.id ? res.data : n))
      );

      setIsOpen(false);
      setActiveNote(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };


  // ✅ Delete (Axios handled correctly)
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // remove from UI instantly
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => (
          <NoteCard
            key={note.id ?? index}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

      </div>

      <EditorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        content={activeNote?.content || ""}
      />
    </>
  );
};

export default NoteList;
