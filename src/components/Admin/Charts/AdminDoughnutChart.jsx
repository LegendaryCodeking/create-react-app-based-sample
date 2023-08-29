import React, { Component } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      textAlign: "right",
    },
    title: {
      display: true,
      text: "Loan status",
    },
  },
};

export const data = {
  labels: ["Approved", "Rejected"],
  datasets: [
    {
      label: "Approved vs rejected",
      data: [30, 20],
      backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

class AdminDoughnutChart extends Component {
  state = {};
  render() {
    return (
      <div className="p-8 bg-gray-200 rounded h-full">
        <Doughnut options={options} data={data} />
      </div>
    );
  }
}

export default AdminDoughnutChart;
