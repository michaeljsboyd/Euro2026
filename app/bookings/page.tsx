import { BookingsManager } from "@/components/bookings-manager";
import { getPlannerData } from "@/lib/supabase/queries";

export default async function BookingsPage() {
  const data = await getPlannerData();

  return <BookingsManager initialBookings={data.bookings} tripId={data.trip.id} />;
}
