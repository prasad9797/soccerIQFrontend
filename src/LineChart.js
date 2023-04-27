import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];



const LineChart = ({ labels=["January", "February", "March", "April", "May", "June"], data=[0, 10, 5, 2, 20, 30, 45],color='red' }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Label for chart",
        backgroundColor: color,
        borderColor: color,
        data: data,
      },
    ],
  }


  return (
    <div style={{width:'600px',marginLeft:'10px'}}>
      <Line data={chartData} style={{height:'600px'}}/>
    </div>
  );
};

export default LineChart;