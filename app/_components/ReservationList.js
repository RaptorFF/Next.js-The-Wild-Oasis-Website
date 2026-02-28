"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  // We use the useOptimistic hook to manage the optimistic state of the bookings list. This allows us to immediately update the UI when a booking is deleted, without waiting for the server response. The optimisticDelete function will be called when we want to delete a booking from the UI, and it will update the bookings list by removing the deleted booking.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      // This function will be called when we want to optimistically delete a booking from the UI. It takes the bookingId of the booking we want to delete and returns a new array of bookings that excludes the deleted booking.
      return currentBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function handleDelete(bookingId) {
    // Optimistically update the UI by removing the booking from the list immediately
    optimisticDelete(bookingId);

    // Call the deleteReservation function to delete the booking from the database
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
