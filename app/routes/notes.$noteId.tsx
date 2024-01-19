import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { NoteType } from "./notes._index";
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

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops! {error.status} Error</h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
