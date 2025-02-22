import { Card, CardContent } from "@/components/ui/card";

export default function BookingList({ bookings }) {
  return (
    <Card className="p-4 mt-4">
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">Booked Appointments</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className="space-y-2">
            {bookings.map((booking, index) => (
              <li key={index} className="border p-2 rounded">
                <strong>{booking.name}</strong> ({booking.email}) - {booking.date}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
