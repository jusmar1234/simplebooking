import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function BookingCalendar({ bookings, onDateClick }) {
  return (
    <Card className="p-4 w-full max-w-md">
      <CardContent>
        <h2 className="text-lg font-semibold mb-3">Booking Calendar</h2>
        <Calendar
          mode="single"
          modifiers={{
            booked: bookings.map((b) => new Date(b.date)),
          }}
          modifiersClassNames={{
            booked: "bg-red-500 text-white",
          }}
          onDayClick={(date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const booking = bookings.find((b) => b.date === formattedDate);
            if (booking) onDateClick(booking);
          }}
        />
      </CardContent>
    </Card>
  );
}
