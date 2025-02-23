import { useState, useEffect } from "react";
import BookingCalendar from "./components/BookingCalendar";
import BookingForm from "./components/BookingForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load bookings from localStorage on initial render
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  // Save bookings to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
    setIsDialogOpen(false); // Close the form after submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6">Booking System</h1>

      {/* Booking Calendar */}
      <BookingCalendar bookings={bookings} onDateClick={setSelectedBooking} />

      {/* Add Booking Button (Opens Dialog) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Add Booking</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Booking</DialogTitle>
          </DialogHeader>
          <BookingForm addBooking={addBooking} bookings={bookings} />
        </DialogContent>
      </Dialog>

      {/* Booking Info Popup */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            <p><strong>Name:</strong> {selectedBooking.name}</p>
            <p><strong>Contact:</strong> {selectedBooking.contact}</p>
            <p><strong>Date:</strong> {selectedBooking.date}</p>
            <p><strong>Occasion:</strong> {selectedBooking.occasion}</p>
            <p><strong>Payment:</strong> ${selectedBooking.payment}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
