"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface IStatCard {
  title: string;
  value: string | number;
  percent?: number;
  period?: string; // e.g. "Last Month"
  Icon: StaticImageData;
}

const StatCard: React.FC<IStatCard> = ({
  title,
  value,
  period,
  Icon,
  percent,
}) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-indigo-50 text-indigo-600">
          <Image src={Icon} height={20} width={20} alt="user logo" />
        </div>
        <h3 className="font-medium text-[18px]">{title}</h3>
      </div>

      <div className="flex justify-between pt-6">
        <div className="text-3xl font-semibold font-roboto">{value}</div>

        {/* Bottom Stats */}
        <div className="text-sm flex justify-start items-end flex-col w-full">
          <div className="flex gap-2 mb-1">
            <TrendingUp className="text-[#4CAF50]" />{" "}
            <span className="text-[16px]">{percent} %</span>
          </div>
          {period && <p className="text-gray-500">{period}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
