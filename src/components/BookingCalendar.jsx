import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function BookingCalendar({ bookings, onDateClick }) {
  return (
    <Card className="p-4 w-full max-w-md bg-gray-50">
      <CardContent>
        <h2 className="text-lg font-semibold mb-3">Booking Calendar</h2>
        <Calendar
          mode="single"
          className="bg-gray-200 rounded"
          modifiers={{
            booked: bookings.map((b) => new Date(b.date)),
          }}
          modifiersClassNames={{
            booked: "bg-red-500 text-white hover:bg-red-600",
          }}
          onDayClick={(date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const booking = bookings.find((b) => b.date === formattedDate);
            if (booking) onDateClick(booking);
          }}
          renderDay={(day, date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const booking = bookings.find((b) => b.date === formattedDate);
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="block">{day}</span>
                </TooltipTrigger>
                {booking && (
                  <TooltipContent>
                    <p><strong>{booking.name}</strong></p>
                    <p>{booking.occasion}</p>
                    <p>${booking.payment}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
