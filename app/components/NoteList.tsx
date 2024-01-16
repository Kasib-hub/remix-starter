import { ReactElement } from "react";
// import the type created to safely move the data
import { NoteType } from "~/routes/notes";

// so to use props you make an interface for the incoming data
interface NewNoteProps {
  notes: NoteType[];
}

function NoteList({ notes }: NewNoteProps): ReactElement {
  return (
    <>
      <p>Have your existing notes here</p>
      {notes.map((note: NoteType) => {
        return (
          <p key={note.id}>
            {note.title} - {note.content} written at {note.date}
          </p>
        );
      })}
    </>
  );
}
export default NoteList;
