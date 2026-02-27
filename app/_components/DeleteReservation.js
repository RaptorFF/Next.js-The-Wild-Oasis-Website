"use client";

import { useTransition } from "react";
import { deleteReservation } from "../_lib/actions";

import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  // We use startTransition to mark the delete action as non-urgent, allowing React to keep the UI responsive while the deletion is processed.
  // isPending can be used to show a loading state if needed, but in this case, we simply rely on the UI to remain responsive without blocking.
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => deleteReservation(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
