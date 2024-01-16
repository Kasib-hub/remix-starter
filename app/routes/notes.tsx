// taking in the links exported form a component to use the css?
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { PrismaClient } from "@prisma/client";
import NoteList, { links as existingNoteLinks } from "~/components/NoteList";

// data also won't get downloaded to the client - thats why it doesn't show in browser console.log
// remix will provide the data - console log shows in the terminal
export async function loader() {
  const prisma = new PrismaClient();
  const allNotes = await prisma.notes.findMany(); // prisma is getting 'notes' from the model in schema file
  console.log(allNotes);
  await prisma.$disconnect;
  return allNotes;
}

interface ActionParams {
  request: Request;
}

export async function action({ request }: ActionParams) {
  const form = await request.formData();
  const prisma = new PrismaClient();
  const newNote = await prisma.notes.create({
    data: {
      title: form.get("title") as string,
      content: form.get("content") as string,
    },
  });
  console.log(newNote);
  await prisma.$disconnect();
  return true;
}

// use a type to pass this definition. Interfaces are compiled at build time and won't work
export type NoteType = {
  id: number;
  title: string;
  content: string;
  date: string;
};

function NotesPage() {
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
