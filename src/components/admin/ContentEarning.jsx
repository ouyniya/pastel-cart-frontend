import { useState, useEffect } from "react";
import EarningGraph from "./GraphEarning";
import GraphSalesAnalytics from "./GraphSalesAnalytics";
import MockupGraph from "./MockupGraph";

const ContentEarning = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="card bg-base-100 w-[100%] lg:w-[65%] basis-[1/2] shadow-sm">
          {loading ? <MockupGraph /> : <EarningGraph data={data} />}
        </div>
        <div className="card bg-base-100 w-[100%] lg:w-[35%] basis-[1/2] shadow-sm">
          {loading ? <MockupGraph /> : <GraphSalesAnalytics />}
        </div>
      </div>
    </>
  );
};
export default ContentEarning;

// Mockup Data
const mockData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Monthly Earnings ($)",
      data: [
        1200, 1900, 3000, 2500, 3200, 4000, 3700, 4200, 4800, 5100, 5300, 6000,
      ],
      fill: true,
      backgroundColor: "#f8c8dd",
      borderColor: "#f8c8dd",
      tension: 0.3,
      pointRadius: 4,
    },
  ],
};
