const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col justify-between">
      
      
      <div
        className="text-sm text-gray-600 mb-4 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-500">
          📅 {note.createdAt}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="cursor-pointer px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="cursor-pointer px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
