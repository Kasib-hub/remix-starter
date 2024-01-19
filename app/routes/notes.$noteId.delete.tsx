import { ActionFunctionArgs, LoaderFunction, json } from "@remix-run/node";
import { useParams, Link, Form, useActionData } from "@remix-run/react";
import { db } from "~/utils/db.server";

interface ActionData {
  success: boolean;
}

export default function NoteEditPage() {
  const { noteId } = useParams();
  const deleteResponse: ActionData | undefined = useActionData();

  return (
    <>
      <div>
        <h1>Are you sure you want to delete #{noteId}?</h1>
        {deleteResponse && <h2>Note Deleted</h2>}
        <p className="cta">
          <Form method="post">
            <button>Yes</button>
          </Form>
          <Link to={`/notes/${noteId}/`}>Go Back</Link>
        </p>
      </div>
    </>
  );
}

// delete note
export async function action({ params }: ActionFunctionArgs) {
  await db.note.delete({
    where: { id: Number(params.noteId) },
  });
  return json({ success: true });
}
