import { useParams, Link, useLoaderData } from "@remix-run/react";
import EditNote, { links as newNoteLinks } from "../components/EditNote";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { NoteType } from "./notes._index";
import { db } from "~/utils/db.server";

export default function NoteEditPage() {
  const { noteId } = useParams();
  const note: NoteType = useLoaderData();

  return (
    <>
      <div>
        <h1>You made it to the edit page for note #{noteId}</h1>
        <EditNote note={note} />
        <p className="cta">
          <Link to={`/notes/${noteId}/`}>Go Back</Link>
        </p>
      </div>
    </>
  );
}

// GET note by Id
export async function loader({
  params,
}: LoaderFunctionArgs): Promise<NoteType> {
  const noteId = params.noteId; // noteId refers to the name in filename
  const note = await db.note.findFirst({
    where: {
      id: Number(noteId),
    },
  });

  // error handling - hitting page that cannot exist

  if (!note) {
    throw new Response(`Could not find note for id ${noteId}`, { status: 404 });
  }

  return note;
}

// PUT the note, recall that params is referring to the URL
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const updatedNote = await db.note.update({
    where: { id: Number(params.noteId) },
    data: noteData,
  });

  console.log(updatedNote);
  return true;
}

export function links() {
  return [...newNoteLinks()];
}
