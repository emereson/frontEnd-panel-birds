import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ allBirds }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const generateDataByMonth = (birds) => {
    const monthsData = Array(12).fill(0);
    if (birds && birds.length > 0) {
      birds.forEach((bird) => {
        const registrationDate = new Date(bird.created_at);
        const month = registrationDate.getMonth();
        monthsData[month]++;
      });
    }
    return monthsData;
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Aves registradas por mes',
            data: generateDataByMonth(allBirds),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [allBirds]);
  return (
    <section className="Graph__container">
      <canvas ref={chartRef}></canvas>
    </section>
  );
};

export default Graph;
