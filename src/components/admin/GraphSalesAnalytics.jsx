import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const GraphSalesAnalytics = () => {
  const data = {
    labels: ["Electronics", "Fashion", "Home & Garden", "Sports", "Others"],
    datasets: [
      {
        label: "Sales Analytics",
        data: [300, 500, 200, 150, 100],
        backgroundColor: [
          "#bfdbfe", // Tailwind blue-200 (pastel blue)
          "#fecaca", // Tailwind red-200 (pastel red)
          "#6ee7b7", // Tailwind emerald-300 (pastel green)
          "#c4b5fd", // Tailwind violet-300 (pastel violet)
          "#60738d",
        ],
        borderColor: "#fff",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 18,
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#60738d99",
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto pt-4 px-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Sales Analytics
      </h2>
      <div style={{ width: "100%", height: "300px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default GraphSalesAnalytics;
