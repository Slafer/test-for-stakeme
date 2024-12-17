interface Noder {
    moniker: string;
    address: string;
}

interface RpcItem {
    noder: Noder;
    rpcIp: string;
    uptime: string;
    apiIp: string;
    tx_index: string;
    grpcIp: string;
    evmIp: string;
}

interface RPCResponse {
    rpcs: {
        cosmos: RpcItem[];
        evm: RpcItem[];
    };
}

export type { RpcItem, RPCResponse };
