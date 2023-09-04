import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const DashboardGraph = () => {
  const months = ['January', 'February', 'March',
  'April', 'May', 'June']
  const rain = [65, 59, 80, 81, 56,100];
  const state = {
    labels: months.map(m =>m),
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: rain.map(r => r)
      }
    ]
  }
  
      return (
        <div>
          <Line
            data={state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      );
    
  }

export default DashboardGraph;
