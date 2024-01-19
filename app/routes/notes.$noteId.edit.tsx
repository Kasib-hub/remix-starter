import { useParams, Link } from "@remix-run/react";
import EditNote, { links as newNoteLinks } from "../components/EditNote";

export default function NoteEditPage() {
  const { noteId } = useParams();

  return (
    <>
      <div>
        <h1>You made it to the edit page for note #{noteId}</h1>
        <EditNote />
        <p className="cta">
          <Link to={`/notes/${noteId}/`}>Go Back</Link>
        </p>
      </div>
    </>
  );
}

export function links() {
  return [...newNoteLinks()];
}
