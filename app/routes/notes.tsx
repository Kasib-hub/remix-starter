import { Outlet } from "@remix-run/react";

interface ActionData {
  success: boolean;
}

export default function NoteEditPage() {
  return (
    <>
      <div>
        <h1>Are you sure you want to root this?</h1>
        <Outlet />
      </div>
    </>
  );
}
