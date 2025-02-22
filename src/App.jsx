import { useState } from "react";
import BookingForm from "./components/BookingForm";
import BookingCalendar from "./components/BookingCalendar";

export default function App() {
  const [bookings, setBookings] = useState([]);

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 space-y-6">
      <h1 className="text-2xl font-bold">Booking System</h1>
      <BookingForm addBooking={addBooking} bookings={bookings} />
      <BookingCalendar bookings={bookings} />
    </div>
  );
}
