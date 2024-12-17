import { useState, useEffect, useCallback } from "react";
import { RpcTable } from "./table";
import { RpcItem, RPCResponse } from "./types";

export function RpcBlock() {
  type RpcType = 'cosmos' | 'evm';
  const [searchMode, setSearchMode] = useState("Search mode");
  const [searchText, setSearchText] = useState("");
  const [rpcType, setRpcType] = useState<RpcType>('cosmos');

  const [fetchedData, setFetchedData] = useState<RPCResponse | null>(null);
  const [rpcData, setRpcData] = useState<RpcItem[]>([]);

  useEffect(() => {
    const fetchRpcData = async () => {
      const response = await fetch('/api/rpc-data');
      const data = await response.json() as RPCResponse;
      setFetchedData(data);
      setRpcData(data.rpcs[rpcType]);
    };
    fetchRpcData();
  }, []);

  const handleRpcTypeChange = (type: RpcType) => {
    setRpcType(type);
  };

  const handleSearchModeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchMode('Search mode');
    setSearchText('');
  };

  useEffect(() => {
    const typedData = fetchedData?.rpcs[rpcType];
    if (searchText) {
      const filteredData = typedData?.filter((rpcItem: RpcItem) => rpcItem.noder.moniker.includes(searchText)) || [];
      setRpcData(filteredData);
    } else {
      setRpcData(typedData || []);
    }
  }, [fetchedData, rpcType, searchText]);

  return (
    <div className="flex flex-col bg-black">
      <div className="flex flex-row justify-between">
        <h1 className="text-white">RPC / REST / GRPs</h1>
        <div className="hidden md:block">
          <div className="flex items-center relative">
            <input type="text" value={searchMode} onChange={(e) => setSearchMode(e.target.value)} 
                className="text-gray-500 text-sm font-light bg-transparent border-[#0B0B0B] border-2 rounded-full px-2 py-1 text-center pl-8 pr-8"
                onFocus={(e) => e.target.value = ''}
                onBlur={(e) => handleSearchModeBlur(e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchText(searchMode);
                  }
                }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-start gap-4 my-4">
        <button 
          className={`px-4 py-2 rounded-full text-sm ${rpcType === 'cosmos' ? 'bg-white text-black' : 'bg-[#0B0B0B] text-white'}`}
          onClick={() => handleRpcTypeChange('cosmos')}
        >
          Cosmos
        </button>
        <button 
          className={`px-4 py-2 rounded-full text-sm ${rpcType === 'evm' ? 'bg-white text-black' : 'bg-[#0B0B0B] text-white'}`}
          onClick={() => handleRpcTypeChange('evm')}
        >
          EVM
        </button>
      </div>
      <RpcTable items={rpcData} />
    </div>
  );
}
