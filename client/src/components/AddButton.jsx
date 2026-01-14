import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <Link
      to="/notes-keeper/create"
      className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center
                 text-4xl rounded-full shadow-lg text-purple-700 ring-2 ring-purple-700
                 transition-transform hover:scale-110"
    >
      +
    </Link>
  );
};

export default AddButton;
