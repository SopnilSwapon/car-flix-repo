import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    invoice: "01",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "02",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "03",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "04",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "05",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "06",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "07",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export default function RecentOrder() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center pt-0 pb-4 justify-between">
        <h3 className="font-semibold text-2xl">Our Recent Orders</h3>
        <button className="rounded-lg px-5 py-2 text-[#727a80] flex gap-1 border-2 border-gray-200">
          View All
        </button>
      </div>
      <Table className="border-2 border-[#EEF3F8] ">
        <TableHeader>
          <TableRow>
            <TableCell className="text-[#444950]">No</TableCell>
            <TableCell className="text-[#444950]">Order Id</TableCell>
            <TableCell className="text-[#444950]">User Name</TableCell>
            <TableCell className="text-[#444950]">Service Name</TableCell>
            <TableCell className="text-[#444950]">Service Type</TableCell>
            <TableCell className="text-[#444950]">Location</TableCell>
            <TableCell className="text-[#444950]">Service Date</TableCell>
            <TableCell className="text-[#444950]">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.totalAmount}</TableCell>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-secondary px-4 font-normal"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-secondary px-4 ml-2 text-white font-normal"
                >
                  Accept
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
