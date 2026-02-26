"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

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
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
