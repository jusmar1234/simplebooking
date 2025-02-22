import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function BookingForm({ addBooking, bookings }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !selectedDate) return alert("Please fill all fields!");

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    // Prevent duplicate bookings
    if (bookings.some((b) => b.date === formattedDate)) {
      alert("This date is already booked!");
      return;
    }

    addBooking({ name, email, date: formattedDate });
    setName("");
    setEmail("");
    setSelectedDate(null);
  };

  return (
    <Card className="p-4 w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* ShadCN Date Picker */}
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

          <Button type="submit" className="w-full">Book Now</Button>
        </form>
      </CardContent>
    </Card>
  );
}
