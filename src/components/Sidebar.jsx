import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Sidebar({ openReport }) {
  return (
    <Card className="w-64 min-h-screen p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <Button className="w-full" onClick={openReport}>View Reports</Button>
    </Card>
  );
}
