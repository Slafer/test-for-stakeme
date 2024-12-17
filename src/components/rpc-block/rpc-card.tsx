import { RpcItem } from "./types";
import { onIcon, offIcon, nodeIcon, copyIcon, onIconMob, offIconMob } from "../../styles/icons";
import { blockIcon } from "../../styles/icons";

function RpcRow({ protocol, ip, moniker, uptime, txIndex }: { protocol: string, ip: string, moniker: string, uptime: string, txIndex: string }) {
    return (
        <>
            <div className={`hidden md:flex flex-row ${txIndex === 'on' ? 'bg-[#0B0B0B]' : 'bg-black'} border border-[#0B0B0B] py-[20px] mb-1`}>
                <div className="text-[#DADADA] flex flex-row justify-start ml-[30px] items-center gap-2 w-1/4">
                    <div className="flex flex-row justify-center items-center">{protocol}</div>
                    <div className="flex flex-row justify-center items-center">{ip}</div>
                    <div className="flex flex-row justify-center items-center">{copyIcon}</div>
                </div>
                <div className="text-[#89C4FF] flex flex-row justify-center items-center gap-2 w-1/4">
                    <div className="flex flex-row justify-center items-center">{nodeIcon}</div>
                    <div className="flex flex-row justify-center items-center">{moniker}</div>
                </div>
                <div className="text-[#89C4FF] flex flex-row justify-center items-center gap-2 w-1/4">
                    <div className="flex flex-row justify-center items-center">{blockIcon}</div>
                    <div className="flex flex-row justify-center items-center">{uptime}</div>
                </div>
                <div className="text-white flex flex-row justify-center w-1/4 gap-2">
                    <div className="flex flex-row justify-center items-center">{txIndex === 'on' ? onIcon : offIcon}</div>
                    <div className="flex flex-row justify-center items-center">{txIndex}</div>
                </div>
            </div>

            <div className={`md:hidden flex flex-col ${txIndex === 'on' ? 'bg-[#0B0B0B]' : 'bg-black'} border border-[#0B0B0B] py-[20px] mb-1`}>
                <div className="flex flex-col ml-3 w-full text-sm">
                    <div className="text-[#DADADA] flex flex-row justify-start items-center gap-2 w-full">
                        <div className="flex flex-row justify-center items-center">{protocol}</div>
                        <div className="flex flex-row justify-center items-center">{ip}</div>
                        <div className="flex flex-row justify-center items-center">{copyIcon}</div>
                    </div>
                </div>
                <div className="flex flex-row w-full mt-2 text-sm">
                    <div className="text-[#89C4FF] flex flex-row justify-center items-center gap-2 w-1/3">
                        <div className="flex flex-row justify-center items-center">{blockIcon}</div>
                        <div className="flex flex-row justify-center items-center">{uptime}</div>
                    </div>
                    <div className="text-[#89C4FF] flex flex-row justify-center items-center gap-2 w-1/3">
                        <div className="flex flex-row justify-center items-center">{nodeIcon}</div>
                        <div className="flex flex-row justify-center items-center">{moniker}</div>
                    </div>
                    <div className="text-white flex flex-row justify-center items-center gap-2 w-1/3">
                        <div className="flex flex-row justify-center items-center">{txIndex === 'on' ? onIconMob : offIconMob}</div>
                        <div className="flex flex-row justify-center items-center">{txIndex}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function RpcCard({ rpcData }: { rpcData: RpcItem }) {
    return (
        <>
            {rpcData.apiIp && (
                <RpcRow 
                    protocol="REST" 
                    ip={rpcData.apiIp} 
                    moniker={rpcData.noder.moniker} 
                    uptime={rpcData.uptime} 
                    txIndex={rpcData.tx_index} 
                />
            )}
            {rpcData.rpcIp && (
                <RpcRow 
                    protocol="RPC" 
                    ip={rpcData.rpcIp} 
                    moniker={rpcData.noder.moniker} 
                    uptime={rpcData.uptime} 
                    txIndex={rpcData.tx_index} 
                />
            )}
            {rpcData.grpcIp && (
                <RpcRow 
                    protocol="GRPC" 
                    ip={rpcData.grpcIp} 
                    moniker={rpcData.noder.moniker} 
                    uptime={rpcData.uptime} 
                    txIndex={rpcData.tx_index} 
                />
            )}
            {rpcData.evmIp && (
                <RpcRow 
                    protocol="EVM" 
                    ip={rpcData.evmIp} 
                    moniker={rpcData.noder.moniker} 
                    uptime={rpcData.uptime} 
                    txIndex={rpcData.tx_index} 
                />
            )}
        </>
    );
}