import { Link, useLoaderData } from "@remix-run/react";
import { NoteType } from "./notes";
import { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";

export default function NotesDetailsPage() {
  const note: NoteType = useLoaderData();

  return (
    <main>
      <header>
        <nav>
          <Link to="/notes">Back to All Notes</Link>
        </nav>
        <h1>
          Note #{note.id} written at{" "}
          {new Date(note.date).toLocaleDateString("en-US")}
        </h1>
      </header>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </main>
  );
}

// once again use loader to get the appropriate data
// but I can't use useParams, need to use the params provided by remix
export async function loader({
  params,
}: LoaderFunctionArgs): Promise<NoteType> {
  const noteId = params.noteId; // noteId refers to the name in filename
  const note = await db.note.findFirstOrThrow({
    where: {
      id: Number(noteId),
    },
  });
  return note;
}
