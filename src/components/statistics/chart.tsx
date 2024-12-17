import { PieChart, Pie, Cell } from 'recharts';

export const PieChartComponent = ({dataPoints}: {dataPoints: { name: string; value: number; color: string }[]}) => {
    return (
      <div>
        <PieChart width={138} height={138}>
          <Pie data={dataPoints} dataKey="value" innerRadius={60} outerRadius={66}>
            {dataPoints.map((entry, index) => (
              <Cell key ={`cell-${index}`} fill={entry.color} />
            ))} 
          </Pie>
        </PieChart>
      </div>
    );
  };