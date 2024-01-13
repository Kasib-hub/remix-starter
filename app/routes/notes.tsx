// taking in the links exported form a component to use the css?
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "../components/NewNote";
import { PrismaClient } from "@prisma/client";


interface ActionParams {
  request: Request;
}

// only takes non GET requets and doesn't render or execute on the client
// data also won't get downloaded to the client
// remix will provide the data - console log shows in the terminal
export async function loader() {
  const prisma = new PrismaClient();
  const allNotes = await prisma.notes.findMany();
  console.log("your notes", allNotes);
  await prisma.$disconnect
  return allNotes;
}

export type NoteType = {
  id: number,
  title: string,
  content: string
}

// once you finish the request useLoaderData grabs the data
function NotesPage() {
  // if you return a component on a separate it will force it to render client side
  // many errors in console as a result.



  const notes : NoteType[] = useLoaderData();



  return (
    <main><NewNote notes={notes} /></main>
  );
}

export default NotesPage;

// I suppose if I had mutiple things to import this would work?
export function links() {
  return [...newNoteLinks()];
}
