import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      mode: "nearest",
      intersect: false,
      backgroundColor: '#60738d99',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Earnings ($)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
  },
};

const EarningGraph = ({ data }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const ctx = canvasRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(248, 200, 221, 0.6)"); // pink top
    gradient.addColorStop(1, "rgba(248, 200, 221, 0)"); // transparent bottom

    const updatedData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: gradient,
        borderColor: "#f8c8dd",
        fill: true,
      })),
    };

    setChartData(updatedData);
  }, [data]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Earning</h2>
      <div
        className="flex justify-center items-center md:h-[300px]"
        style={{ width: "100%"}}
      >
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {chartData && (
          <Line
            data={chartData}
            options={options}
            height={300}
            width={600}
            getDatasetAtEvent={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default EarningGraph;
