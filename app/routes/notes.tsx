// taking in the links exported form a component to use the css?
import NewNote, { links as newNoteLinks } from "../components/NewNote";

function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export default NotesPage;

// I suppose if I had mutiple things to import this would work?
export function links() {
  return [...newNoteLinks()];
}
