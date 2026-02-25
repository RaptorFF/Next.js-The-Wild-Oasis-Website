"use server";

import { signIn, signOut } from "./auth";

export async function updateGuestProfile() {
  console.log("Server actions");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
