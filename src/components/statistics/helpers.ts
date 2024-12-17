import { MapDataResponse } from "./types";

export function createPieChartData(data: Record<string, number>): { dataPoints: { name: string; value: number, color: string }[]; total: number } {
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    const dataPoints = Object.entries(data)
      .map(([key, count]) => ({
        name: key,
        value: parseInt((count / total * 100).toFixed(2)),
        color: getRandomColor()
      }))
      .sort((a, b) => b.value - a.value)
  
    return { dataPoints, total };
  }
  
 export function groupAndCountByAs(data: MapDataResponse[]): Record<string, number> {
      return data.reduce((acc, item) => {
        const key = item.as;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
} 
  
export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}