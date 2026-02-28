"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
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
