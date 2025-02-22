import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function BookingCalendar({ bookings }) {
  return (
    <Card className="p-4 w-full max-w-md">
      <CardContent>
        <h2 className="text-lg font-semibold mb-3">Booking Calendar</h2>
        <Calendar
          mode="single"
          modifiers={{
            booked: bookings.map((b) => new Date(b.date)),
          }}
          modifiersStyles={{
            booked: { backgroundColor: "#ff6666", color: "white" }, // Booked dates in red
          }}
        />
      </CardContent>
    </Card>
  );
}
