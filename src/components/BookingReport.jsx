import { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function BookingReport({ logs }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const paginatedLogs = logs.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="space-y-4">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedLogs.map((log, i) => (
            <TableRow key={i}>
              <TableCell>{log.type}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button disabled={(page + 1) * itemsPerPage >= logs.length} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
