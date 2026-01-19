import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <Link
      to="/notes-keeper/create"
      className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center
           text-2xl rounded-full text-purple-700
           ring-2 ring-purple-700
           shadow-[0_8px_25px_rgba(168,85,247,0.45)]
           hover:shadow-[0_12px_35px_rgba(168,85,247,0.6)]
           transition-all hover:scale-110"

    >
      ➕
    </Link>
  );
};

export default AddButton;
