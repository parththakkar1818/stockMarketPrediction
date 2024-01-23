import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatDateString } from './DateInput';
// import { Link } from 'react-router-dom';


const StockChart = ({ stockData=[], startDate=[], endDate=[], selectedStock=[], predictedData=[]}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;

    if (chartRef.current && stockData) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      if (myChart) {
        myChart.destroy();
      }

      const dates = stockData.map((item) => formatDateString(item.date)).reverse(); // Reverse the order
      // console.log("dates: ",dates);
      const highs = stockData.map((item) => item.high).reverse();
      const closes = stockData.map((item) => item.close).reverse();
      const opens = stockData.map((item) => item.open).reverse();
      const predictedHigh = predictedData.map((item) => {
        if(typeof item[0]== "number"){
          return item[0].toFixed(2);
        }
        return null;
      });
      
      const convertedPredictedHigh = predictedHigh
        .map(value => (value !== undefined ? parseFloat(value) : undefined))
        .filter(value => value !== undefined);
      const datesPredicted=[];
      for (let i = 1; i <= convertedPredictedHigh.length; i++) {
        datesPredicted.push(i.toString());
      }

      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...dates , ...datesPredicted],
          datasets: [
            {
              label: 'High',
              data: [...highs , null],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            ...(convertedPredictedHigh.length > 0
              ? [
                  {
                    label: 'Predicted',
                    data: [...Array(highs.length).fill(null), ...convertedPredictedHigh],
                    borderColor: 'rgba(0, 128, 0, 1)',
                    backgroundColor: 'rgba(0, 128, 0, 0.2)',
                  },
                ]
              : []),
            // {
            //   label: 'Predicted',
            //   data: [...Array(highs.length).fill(null) , ...predictedHigh],
            //   borderColor: 'rgba(0, 128, 0, 1)',
            //   backgroundColor: 'rgba(0, 128, 0, 0.2)',
            // },
            
            {
              label: 'Close',
              data: closes,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Open',
              data: opens,
              borderColor: 'rgba(255, 205, 86, 1)',
              backgroundColor: 'rgba(255, 205, 86, 0.2)',
            },
          ],
        },
      });
    }

    // Cleanup the chart on component unmount
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [stockData,predictedData]);

  

  return (
    <div>
      <canvas ref={chartRef} className='py-10' />
    </div>
  );
};




export default StockChart;
