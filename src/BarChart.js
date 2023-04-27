import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({labels=[],data=[]}) => {
  const datas = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data,
      },
    ],
  };
  return (
<div style={{width:'800px',height:'650px',marginLeft:'20px'}}>
        <Bar data={datas}/>
    </div>
  );
};

export default BarChart;