import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

const Editor = () => {
  const editorRef = useRef(null);
  const [htmlOutput, setHtmlOutput] = useState("");

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        placeholder: "Start writing your note...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
          },
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // 🔥 Convert EditorJS blocks → HTML
  const convertToHTML = (blocks) => {
    return blocks
      .map((block) => {
        switch (block.type) {
          case "header":
            return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;

          case "paragraph":
            return `<p>${block.data.text}</p>`;

          case "list":
            if (block.data.style === "ordered") {
              return `
                <ol>
                  ${block.data.items.map((item) => `<li>${item}</li>`).join("")}
                </ol>
              `;
            }
            return `
              <ul>
                ${block.data.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            `;

          default:
            return "";
        }
      })
      .join("");
  };

  const handleSave = async () => {
    const data = await editorRef.current.save();
    const html = convertToHTML(data.blocks);

    console.log("Generated HTML 👉", html);
    setHtmlOutput(html);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            📝 Create Note
          </h2>
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            💾 Save
          </button>
        </div>

        {/* Editor */}
        <div className="p-6">
          <div
            id="editorjs"
            className="min-h-[320px] rounded-lg border border-gray-300 bg-gray-50 p-4 focus:outline-none"
          />
        </div>

        {/* HTML Preview */}
        {htmlOutput && (
          <div className="border-t bg-gray-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              📄 Generated HTML Preview
            </h3>

            <div
              className="prose max-w-none rounded-md border bg-white p-4"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
