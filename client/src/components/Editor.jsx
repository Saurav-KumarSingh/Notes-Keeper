import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const EditorModal = ({ isOpen, onClose, content, onSave }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (isOpen && !editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs-modal",
        autofocus: true,
        data: {
          blocks: [
            {
              type: "paragraph",
              data: { text: content || "" },
            },
          ],
        },
        tools: {
          header: { class: Header, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          paragraph: { class: Paragraph },
        },
      });
    }

    return () => {
      if (!isOpen && editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isOpen, content]);

  // 🔥 Convert EditorJS → FULL HTML
  const blocksToHTML = (blocks) =>
    blocks
      .map((block) => {
        switch (block.type) {
          case "header":
            return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;

          case "paragraph":
            return `<p>${block.data.text}</p>`;

          case "list": {
            const tag = block.data.style === "ordered" ? "ol" : "ul";
            return `<${tag}>${block.data.items
              .map((i) => `<li>${i}</li>`)
              .join("")}</${tag}>`;
          }

          default:
            return "";
        }
      })
      .join("");

  // ✅ Save button
  const handleSave = async () => {
    if (!editorRef.current) return;

    const data = await editorRef.current.save();
    const html = blocksToHTML(data.blocks);

    // -> to parent
    onSave(html);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">✏️ Edit Note</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-black hover:animate-pulse hover:scale-120">
            ✕
          </button>
        </div>

        {/* Editor */}
        <div className="p-6">
          <div
            id="editorjs-modal"
            className="min-h-[320px] rounded-lg border bg-gray-50 p-4"
          />
        </div>

        {/* Footer (UNCHANGED UI) */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md border px-4 py-2 text-sm hover:bg-red-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorModal;
