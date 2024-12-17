import * as React from "react";
import { DataPoint } from "./DataPoint";
import { MapDataResponse } from "./types";
import { useEffect } from "react";
import { useState } from "react";
import { PieChartComponent } from "../statistics/chart";
import { createPieChartData } from "./helpers";
import { groupAndCountByAs } from "./helpers";
import { DataPointCount } from "../statistics/dataPointCount";
import { NodeDataCenterModal } from "./modal";

export function Statistics() {
  const [dataPoints, setDataPoints] = useState<{ name: string; value: number; color: string }[]>([]);

  const [mapData, setMapData] = useState<MapDataResponse[]>([]);
  const [asToIsp, setAsToIsp] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onViewAllClick = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetch('/api/map-data')
      .then(response => response.json())
      .then(data => setMapData(data))
      .catch(error => console.error('Error fetching map data:', error));
  }, []);
  useEffect(() => {
    if (mapData) {
        const groupedData = groupAndCountByAs(mapData);
        const { dataPoints } = createPieChartData(groupedData);
        setDataPoints(dataPoints);
        const mapping = mapData.map((item) => ({ [item.as]: item.isp }));
        setAsToIsp(Object.assign({}, ...mapping));
    }
}, [mapData]);

  return (
    <div className="flex overflow-hidden flex-col p-8 w-full max-w-[387px] max-h-[321px] rounded-3xl bg-neutral-950 max-md:px-5">
      <div className="flex overflow-hidden gap-10 justify-between items-center w-full text-white">
        <div className="self-stretch my-auto text-lg font-light mb-4">
          Node Data center
        </div>
        <DataPointCount 
          count={dataPoints.length} 
          colors={dataPoints.slice(0, 5).map(dp => dp.color)} 
        />
      </div>
      <div className="flex flex-row h-full w-full overflow-hidden gap-5 items-center mt-5 w-full text-sm font-light whitespace-nowrap text-slate-500">
        <div className="flex gap-3 h-full items-center self-stretch my-auto text-2xl whitespace-nowrap">
          <PieChartComponent dataPoints={ dataPoints } />
        </div>
        <div className="flex overflow-hidden flex-col shrink items-center self-stretch my-auto">
          {dataPoints.length > 0 && <DataPoint dataPoints={dataPoints} asToIsp={asToIsp} />}
        </div>
      </div>
      <button
        onClick={onViewAllClick}
        className="flex gap-2.5 justify-center items-center self-center px-10 py-1 mt-5 text-sm bg-slate-400 bg-opacity-10 rounded-[100px] text-slate-400 max-md:px-5"
      >
        <span className="gap-1.5 self-stretch my-auto">View all centers</span>
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <NodeDataCenterModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} nodes={dataPoints.map((node, index) => ({ ...node, index: index + 1 }))} asToIsp={asToIsp} />
          </div>
        </div>
      )}
    </div>
  );
}
