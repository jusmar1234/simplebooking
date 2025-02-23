import { useState, useEffect } from "react";
import BookingCalendar from "./components/BookingCalendar";
import BookingForm from "./components/BookingForm";
import BookingReport from "./components/BookingReport";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);

    const savedLogs = JSON.parse(localStorage.getItem("activityLogs")) || [];
    setActivityLogs(savedLogs);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(activityLogs));
  }, [activityLogs]);

  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
    setActivityLogs([...activityLogs, { type: "Booked", ...newBooking, timestamp: new Date() }]);
    setIsDialogOpen(false);
  };

  const updateBooking = (updatedBooking) => {
    setBookings(bookings.map(b => b.date === updatedBooking.date ? updatedBooking : b));
    setActivityLogs([...activityLogs, { type: "Updated", ...updatedBooking, timestamp: new Date() }]);
    setSelectedBooking(null);
  };

  const cancelBooking = (date) => {
    setBookings(bookings.filter(b => b.date !== date));
    setActivityLogs([...activityLogs, { type: "Cancelled", date, timestamp: new Date() }]);
    setSelectedBooking(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar openReport={() => setIsReportOpen(true)} />

      <div className="flex flex-col items-center justify-center flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Booking System</h1>

        {/* Booking Calendar */}
        <BookingCalendar bookings={bookings} onDateClick={setSelectedBooking} />

        {/* Add Booking Button */}
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
              <div className="flex gap-2 mt-4">
                <Button onClick={() => updateBooking(selectedBooking)}>Update</Button>
                <Button variant="destructive" onClick={() => cancelBooking(selectedBooking.date)}>Cancel</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Report Page */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Activity Report</DialogTitle>
          </DialogHeader>
          <BookingReport logs={activityLogs} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
