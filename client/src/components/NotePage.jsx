import Navbar from "./Navbar";
import NoteList from "./NoteList";
import AddButton from "./AddButton";

const NotesPage = () => {
  return (
    <div>
      <div className="sticky top-0">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gray-100 p-6">
        <NoteList />
      </div>

      <AddButton />
    </div>
  );
};

export default NotesPage;
