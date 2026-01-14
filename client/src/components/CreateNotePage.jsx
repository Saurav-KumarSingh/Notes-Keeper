import { useState } from "react";
import EditorModal from "./Editor";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNotePage = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSave = async (html) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes`,
        { content: html },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Note created successfully 🎉");
      navigate("/notes-keeper"); // This remounts NotesPage, so NoteList fetches again

    } catch (err) {
      toast.error("Note creation failed",err);
    }
  };

  return (
    <EditorModal
      isOpen={isEditorOpen}
      onClose={() => navigate("/notes-keeper")}
      content=""
      onSave={handleSave}
    />
  );
};

export default CreateNotePage;
