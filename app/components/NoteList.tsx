import { ReactElement } from "react";
// import the type created to safely move the data
import { NoteType } from "~/routes/notes";
import noteListStyles from "./NoteList.css";
import { Link } from "@remix-run/react";

interface LinkProps {
  rel: string;
  href: string;
}

// so to use props you make an interface for the incoming data
interface NewNoteProps {
  notes: NoteType[];
}

function NoteList({ notes }: NewNoteProps): ReactElement {
  return (
    <>
      <div id="note-list">
        {notes.map((note: NoteType) => {
          return (
            <p key={note.id} className="note-item">
              <Link to={"note-{note.id}"}>
                <p>Note #{note.id}</p>
                {note.title} - {note.content} written at{" "}
                {new Date(note.date).toLocaleDateString("en-US")}
              </Link>
            </p>
          );
        })}
      </div>
    </>
  );
}
export default NoteList;

export function links(): LinkProps[] {
  return [{ rel: "stylesheet", href: noteListStyles }];
}
