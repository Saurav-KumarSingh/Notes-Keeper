import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import EditorModal from "./Editor";
import { toast } from "react-toastify";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data);
    } catch {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setActiveNote(note);
    setIsOpen(true);
  };

  const handleSave = async (html) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/notes/${activeNote.id}`,
        { content: html },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes(prev => prev.map(n => n.id === activeNote.id ? res.data : n));
      toast.success("Note updated successfully 🎉");
      setIsOpen(false);
      setActiveNote(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/notes/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(prev => prev.filter(n => n.id !== id));
      toast.success("Note deleted successfully 🎉");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <EditorModal
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); setActiveNote(null); }}
        content={activeNote?.content || ""}
        onSave={handleSave}
      />
    </>
  );
};

export default NoteList;
