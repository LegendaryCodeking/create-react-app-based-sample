import React, { Component } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
class TargetVariableCorrelationBarChart extends Component {
  state = {};
  render() {
    //const root = am5.Root.new("chartdiv");
    return (
      <div className="p-4 mb-4 bg-mediumblue" style={{ height: "30rem" }}>
        <ResponsiveContainer className="p-4" width="100%" height="100%">
          <BarChart
            width={90}
            height={40}
            data={data}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#fff"
            />
            <Tooltip />
            <Legend
              iconType="circle"
              verticalAlign="top"
              height={36}
              align="right"
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" stackId="a" fill="#22ffff" />
            <Bar dataKey="pv" stackId="a" fill="#f0da14" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TargetVariableCorrelationBarChart;
