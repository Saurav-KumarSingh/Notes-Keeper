const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center text-4xl rounded-full
                 shadow-lg text-purple-700 ring-2 ring-purple-700
                 transition-transform hover:scale-110 focus:ring-4"
    >
      +
    </button>
  );
};

export default AddButton;
