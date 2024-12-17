import { nodeIcon } from "../../../styles/icons";

export const NodeCard = ({ node, asToIsp }: { node: { name: string, index: number, percentage: number }, asToIsp: { [key: string]: string } }) => {
    return (
        <div className="flex flex-row w-full bg-transparent p-2 justify-between rounded">
            <div className="flex flex-row items-center gap-2">
                <div className="text-[#7C8798]">{node.index}</div>
                {nodeIcon}
                <div className="text-[#7C8798]">{asToIsp[node.name]}</div>
            </div>
            <div className="flex text-gray-400 rounded-2xl bg-gray-700 p-2">{(node.percentage * 100).toFixed(2)}%</div>
        </div>
    );
};