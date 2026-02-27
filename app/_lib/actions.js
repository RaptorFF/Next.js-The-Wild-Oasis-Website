"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuestProfile(formData) {
  // Check if the user is authenticated before allowing them to update their profile
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");
  // Add logic to update the guest profile using formData
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const regex = /^[a-zA-Z0-9]{6,12}$/;

  function isValidNationID(nationID) {
    return regex.test(nationID);
  }

  if (!isValidNationID(nationalID)) {
    throw new Error(
      "Invalid National ID number. It should be 6-12 characters long and contain only letters and numbers.",
    );
  }

  const updateData = { nationality, countryFlag, nationalID };
  // We can use the session data to identify which guest is trying to update their profile and then update the corresponding record in the database.
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  // After updating the guest profile, we want to revalidate the profile page so that the updated information is displayed when the user navigates back to their profile.
  revalidatePath("/account/profile");
}

export async function updateReservation(formData) {
  // Check if the user is authenticated before allowing them to update a reservation
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to update a reservation");

  // Add logic to update the reservation using formData
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const bookingId = formData.get("bookingId");

  const updateData = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // After updating the reservation, we want to revalidate the reservations page so that the updated reservation information is displayed when the user navigates back to their reservations.
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  // Check if the user is authenticated before allowing them to delete a reservation
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to delete a reservation");

  // We also want to ensure that the user can only delete their own reservations, so we check if the bookingId belongs to a reservation made by the currently authenticated user before allowing the deletion to proceed.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this reservation");
  }

  // Add logic to delete the reservation with the given bookingId
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // After deleting the reservation, we want to revalidate the reservations page so that the deleted reservation is no longer displayed when the user navigates back to their reservations.
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
