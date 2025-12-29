const NoteCard = ({ content, createdAt, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border border-gray-100">
      
      

      <p className="text-sm text-gray-600 mb-4 overflow-hidden">
        {content.length > 120 ? content.substring(0, 120) + "..." : content}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">📅 {createdAt}</span>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            ✏️ Edit
          </button>

          <button
            onClick={onDelete}
            className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
