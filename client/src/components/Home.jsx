import Editor from "./Editor"
import Navbar from "./Navbar"
import NoteList from "./NoteList"

const Home = () => {
  return (
    <div>

      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* <Editor /> */}
        <NoteList/>
      </div>

      <div>
        
      </div>

    </div>
  )
}

export default Home