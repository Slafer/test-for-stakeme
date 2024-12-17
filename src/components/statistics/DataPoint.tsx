import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface DataPointProps {
  dataPoints: { name: string; value: number; color: string }[];
  asToIsp: Record<string, string>;
}

export function DataPoint({ dataPoints, asToIsp }: DataPointProps) {
  const [sortedData, setSortedData] = useState<{name: string, value: number, color: string}[]>([]);

  useEffect(() => {
    if (dataPoints.length > 0) {
      dataPoints.sort((a, b) => b.value - a.value);
      setSortedData(dataPoints.slice(0, 6).map((item) => ({name: item.name, value: item.value, color: item.color})));
    }
  }, [dataPoints]);

  return (
    <div className="flex flex-col overflow-hidden gap-1 items-start my-2 first:mt-0 text-sm">
      {sortedData.map((item) => (
        <div key={item.name} className="flex flex-row gap-1">
          <div className={`w-2.5 h-2.5 rounded-full mt-1`} style={{ backgroundColor: item.color }}></div>
          <div className="hidden md:block">{asToIsp[item.name].length > 20 ? asToIsp[item.name].substring(0, 20) + "..." : asToIsp[item.name]}</div>
          <div className="block md:hidden">{asToIsp[item.name].length > 10 ? asToIsp[item.name].substring(0, 10) + "..." : asToIsp[item.name]}</div>
        </div>
      ))}
    </div>
  );
}