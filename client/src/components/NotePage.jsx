import { useState } from "react";
import AddButton from "./AddButton";
import EditorModal from "./Editor";

const NotesPage = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [noteHtml, setNoteHtml] = useState("");

  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  // ✅ REAL SAVE LOGIC (PARENT)
  const handleSave = (html) => {
    setNoteHtml(html);

    console.log("🧾 FULL EDITOR HTML 👇");
    console.log(html);
  };

  return (
    <div className="p-6">
      {/* Render saved note */}
      {noteHtml && (
        <div
          className="prose mb-6 rounded border bg-white p-4 shadow"
          dangerouslySetInnerHTML={{ __html: noteHtml }}
        />
      )}

      {/* Add Button */}
      <AddButton onClick={openEditor} />

      {/* Editor Modal */}
      <EditorModal
        isOpen={isEditorOpen}
        onClose={closeEditor}
        content=""
        onSave={handleSave}
      />
    </div>
  );
};

export default NotesPage;
