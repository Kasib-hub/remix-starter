import { ReactElement } from "react";
import newNoteStyles from "./NewNote.css";
import { Form, useActionData, useNavigation } from "@remix-run/react";

interface LinkProps {
  rel: string;
  href: string;
}

interface ActionData {
  message: string;
}

function NewNote(): ReactElement {
  const navigation = useNavigation();

  // navigations can let us see past actions, if something is loading etc
  const isSubmitting = navigation.state === "submitting";

  //
  const data: ActionData | undefined = useActionData(); // this is the result of validation in notes_index action function.

  return (
    <Form id="note-form" method="post">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea rows={5} id="content" name="content" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

// return type is an arraw of objects conforming to LinkProps
export function links(): LinkProps[] {
  return [{ rel: "stylesheet", href: newNoteStyles }];
}
