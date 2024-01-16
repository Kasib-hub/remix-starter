import { ReactElement } from "react";
// import the type created to safely move the data
import { NoteType } from "~/routes/notes";
import noteListStyles from "./NoteList.css";

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
              <p>Note #{note.id}</p>
              {note.title} - {note.content} written at{" "}
              {new Date(note.date).toLocaleDateString("en-US")}
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
