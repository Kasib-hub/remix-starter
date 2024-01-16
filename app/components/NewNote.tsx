import { ReactElement} from "react";
import newNoteStyles from "./NewNote.css";
// import the type created to safely move the data
import { NoteType } from "~/routes/notes";

interface LinkProps {
  rel: string;
  href: string;
}

// so to use props you make an interface for the incoming data
interface NewNoteProps {
  notes: NoteType[]
}

function NewNote({notes}: NewNoteProps): ReactElement {
  return (
    <form id="note-form" method="post">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea rows={5} id="content" name="content" required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
      {
        notes.map((note: NoteType) => {
          return (
            <p key={note.id}>{note.title} - {note.content} written at {note.date}</p>
          )
        })
      }
    </form>
  );
}

export default NewNote;

// return type is an arraw of objects conforming to LinkProps
export function links(): LinkProps[] {
  return [{ rel: "stylesheet", href: newNoteStyles }];
}
