import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { ca } from "date-fns/locale";

export async function GET(request, { params }) {
  const { cabinId } = params; // Extract the cabinId from the route parameters

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]); // Attempt to fetch the cabin data using the provided cabinId
    return Response.json({ cabin, bookedDates }); // If successful, return the cabin data and booked dates as a JSON response
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
