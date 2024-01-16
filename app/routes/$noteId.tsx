import { Link } from "@remix-run/react";

export default function NotesDetailsPage() {
  return (
    <main>
      <header>
        <nav>
          <Link to="/notes">Back to All Notes</Link>
        </nav>
        <h1>N Head</h1>
      </header>
      <p>content</p>
    </main>
  );
}
