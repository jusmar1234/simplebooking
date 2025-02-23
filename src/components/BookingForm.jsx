import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function BookingForm({ addBooking, bookings }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [occasion, setOccasion] = useState("");
  const [payment, setPayment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !contact || !selectedDate || !occasion || !payment) {
      return alert("Please fill all fields!");
    }

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    if (bookings.some((b) => b.date === formattedDate)) {
      alert("This date is already booked!");
      return;
    }

    if (payment < 1000 || payment > 10000) {
      alert("Payment must be between $1,000 and $10,000.");
      return;
    }

    addBooking({ name, contact, date: formattedDate, occasion, payment });
    setName("");
    setContact("");
    setSelectedDate(null);
    setOccasion("");
    setPayment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => bookings.some((b) => b.date === format(date, "yyyy-MM-dd"))}
          />
        </PopoverContent>
      </Popover>

      <Input placeholder="Occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} />
      <Input
        type="number"
        placeholder="Payment (1k-10k)"
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      />

      <Button type="submit" className="w-full">Book Now</Button>
    </form>
  );
}
