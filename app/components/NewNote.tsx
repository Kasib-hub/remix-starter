import { ReactElement } from "react";
import newNoteStyles from "./NewNote.css";
// import the type created to safely move the data
import { NoteType } from "~/routes/notes";

interface LinkProps {
  rel: string;
  href: string;
}

function NewNote(): ReactElement {
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
    </form>
  );
}

export default NewNote;

// return type is an arraw of objects conforming to LinkProps
export function links(): LinkProps[] {
  return [{ rel: "stylesheet", href: newNoteStyles }];
}
