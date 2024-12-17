import React, { useState } from 'react'
import { DataPointCount } from "../../statistics/dataPointCount";
import { NodeCard } from './nodeCard';
import { closeIcon } from '@/styles/icons';

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    nodes: { name: string, value: number, color: string, index: number }[];
    asToIsp: Record<string, string>;
}

export const NodeDataCenterModal = ({ isModalOpen, setIsModalOpen, nodes, asToIsp }: ModalProps) => {
    const total = nodes.reduce((sum, node) => sum + node.value, 0);
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(nodes.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const displayedNodes = nodes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
            )}
            <div className={`fixed inset-0 flex w-[90%] justify-self-center my-auto z-50 ${isModalOpen ? 'block' : 'hidden'}`}>
                <div className="bg-[#0B0B0B] rounded-3xl max-h-[80%] md:max-h-[250px] my-auto justify-center p-6 w-full">
                    <div className="flex flex-row mb-4 w-full justify-between">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex text-white text-xl mr-10">Node Data Center</div>
                            <DataPointCount count={nodes.length} colors={nodes.slice(0, 5).map(node => node.color)} />
                        </div>
                        <button className="flex text-white text-2xl justify-self-end" onClick={() => setIsModalOpen(false)}>{closeIcon}</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {displayedNodes.map((node) => (
                            <NodeCard node={{ index: node.index, percentage: node.value/total, name: node.name }} asToIsp={asToIsp} />
                        ))}
                    </div>
                    <div className="flex flex-row justify-self-end gap-8 mt-4">
                        <button 
                            onClick={() => handlePageChange(1)} 
                            disabled={currentPage === 1}
                            className="text-white rounded"
                        >
                            {"|<"}
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="text-white rounded"
                        >
                            {"<"}
                        </button>
                        <div className="text-gray-400 flex flex-row gap-8">
                            {currentPage > 2 && <span>1</span>}
                            {currentPage > 3 && <span>...</span>}
                            {currentPage > 1 && <span>{currentPage - 1}</span>}
                            <span className="text-white">{currentPage}</span>
                            {currentPage < totalPages - 1 && <span>{currentPage + 1}</span>}
                            {currentPage < totalPages - 2 && <span>...</span>}
                            {currentPage < totalPages && <span>{totalPages}</span>}
                        </div>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            className="text-white rounded"
                        >
                            {">"}
                        </button>
                        <button 
                            onClick={() => handlePageChange(totalPages)} 
                            disabled={currentPage === totalPages}
                            className="text-white rounded"
                        >
                            {">|"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NodeDataCenterModal;
