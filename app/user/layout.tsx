import React from "react";
import QueryProvider from "../Provider/QueryProvider";
import Sidebar from "../Components/Sidebar";
import TopBar from "../Components/TopBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <QueryProvider>
        <div>
          <Sidebar />
          <TopBar />
          <div className="pl-0 lg:pl-[280px] pt-17">
            <div className="border-r min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 relative border-[#E9E9E9]">
              {children}
            </div>
          </div>
        </div>
      </QueryProvider>
    </div>
  );
}
