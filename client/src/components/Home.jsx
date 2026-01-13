import AddButton from "./AddButton"
// import Editor from "./Editor"
import Navbar from "./Navbar"
import NoteList from "./NoteList"
import NotesPage from "./NotePage"

const Home = () => {
  return (
    <div>


      <div className="sticky top-0">
      <Navbar />

      </div>

      <div className="min-h-screen bg-gray-100 p-6">
    
        <NoteList/>
      </div>

      <div>
        <NotesPage/>
      </div>

    </div>
  )
}

export default Home