// taking in the links exported form a component to use the css?
import { json, useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import NoteList, { links as existingNoteLinks } from "~/components/NoteList";
import { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { ReactElement } from "react";

// data also won't get downloaded to the client - thats why it doesn't show in browser console.log
// remix will provide the data - console log shows in the terminal

export async function loader(): Promise<NoteType[]> {
  const allNotes = await db.note.findMany(); // prisma is getting 'notes' from the model in schema file
  if (!allNotes || allNotes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "Not Found" }
    );
  }
  return allNotes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  // FormData returns a type that doesn't align so I can't type it. Still works fine
  // going to use type assertion
  const noteData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  if (noteData.title.trim().length < 5) {
    return {
      message: "Invalid title - must be at least 5 characters long.",
    };
  }

  const newNote = await db.note.create({
    data: noteData,
  });
  console.log(newNote);
  // user feedback?
  return true;
}

// use a type to pass this definition. Interfaces are compiled at build time and won't work
export type NoteType = {
  id: number;
  title: string;
  content: string;
  date: string | Date;
};

function NotesPage(): ReactElement {
  const notes: NoteType[] = useLoaderData(); // useLoaderData grabs the data from request

  // if you return a component on a separate line it will force the render client side
  // many errors in console as a result.
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export default NotesPage;

// I suppose if I had mutiple things to import this would work?
export function links() {
  return [...newNoteLinks(), ...existingNoteLinks()];
}
