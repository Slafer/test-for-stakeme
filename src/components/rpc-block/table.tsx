import { useEffect, useState } from "react";
import { RpcItem } from "./types";
import { RpcCard } from "./rpc-card";

export function RpcTable({ items }: { items: RpcItem[] }) {
  const [sortedItems, setSortedItems] = useState(items);
  const [sortOption, setSortOption] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<{ [key: string]: boolean }>({
    blockHistory: false,
    indexation: false,
  });

  useEffect(() => {
    console.log("sort started");
    let sortedArray = [...items];
    if (sortOption === 'blockHistory') {
      sortedArray.sort((a, b) => sortDirection.blockHistory 
        ? parseInt(a.uptime) - parseInt(b.uptime) 
        : parseInt(b.uptime) - parseInt(a.uptime));
    } else if (sortOption === 'indexation') {
      sortedArray.sort((a, b) => !sortDirection.indexation 
        ? (a.tx_index === 'on' ? -1 : 0) - (b.tx_index === 'on' ? -1 : 0) 
        : (b.tx_index === 'on' ? -1 : 0) - (a.tx_index === 'on' ? -1 : 0));
    }
    setSortedItems(sortedArray);
    console.log("sort finished");
  }, [sortOption, sortDirection, items]);

  const handleSort = (option: string) => {
    setSortOption(option);
    setSortDirection(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="flex flex-col bg-black">
      <div className="hidden md:block">
        <div className="flex flex-row bg-black">
          <div className="flex text-[#707070] justify-start w-1/4 ml-[30px]">Status, Location</div>
          <div className="flex text-[#707070] justify-center w-1/4">Node</div>
          <div className={`text-[#707070] flex justify-center w-1/4 cursor-pointer ${sortOption === 'blockHistory' ? 'text-white' : ''}`} onClick={() => handleSort('blockHistory')}>
            Block History {sortDirection.blockHistory ? '↑' : '↓'}
          </div>
          <div className={`text-[#707070] flex justify-center w-1/4 cursor-pointer ${sortOption === 'indexation' ? 'text-white' : ''}`} onClick={() => handleSort('indexation')}>
            Indexation {sortDirection.indexation ? '↑' : '↓'}
          </div>
        </div>
      </div>
      {sortedItems && (
        <div className="flex flex-col bg-black">
          {sortedItems.map((rpcItem: RpcItem) => (
            <RpcCard rpcData={rpcItem}/>
          ))}
        </div>
      )}
    </div>
  );
}
