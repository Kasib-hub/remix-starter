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

// only takes non GET requets and doesn't render or execute on the client
export function action() {}

// I suppose if I had mutiple things to import this would work?
export function links() {
  return [...newNoteLinks()];
}
