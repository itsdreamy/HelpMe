import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { fetchUserStatsByGranularity } from "../api/mockData"; // Import API function
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Default data for the chart
  const [data, setData] = useState([
    { period: "Week 1", count: 10 },
    { period: "Week 2", count: 15 },
    { period: "Week 3", count: 8 },
    { period: "Week 4", count: 12 },
  ]); 
  
  const [granularity, setGranularity] = useState("weekly"); // Default value for granularity
  const [startDate, setStartDate] = useState(""); // Rentang tanggal
  const [endDate, setEndDate] = useState("");   // Rentang tanggal

  // useEffect for fetching data from API on component render or when granularity/date changes
  useEffect(() => {
    const loadData = async () => {
      if (startDate && endDate) {  // If both dates are provided
        const response = await fetchUserStatsByGranularity(granularity, startDate, endDate); // Fetch API
        if (response && response.data) {
          const formattedData = formatDataForChart(response.data, granularity); // Format data for chart
          setData(formattedData); // Set chart data
        }
      }
    };
    loadData();
  }, [granularity, startDate, endDate]); // Re-run when granularity, startDate, or endDate changes

  // Format data from API for the chart
  const formatDataForChart = (data, granularity) => {
    if (granularity === "weekly") {
      return data.map((item) => ({
        period: `Week ${item.period}`,
        count: item.count,
      }));
    } else if (granularity === "monthly") {
      return data.map((item) => ({
        period: `Month ${item.month} - ${item.year}`,
        count: item.count,
      }));
    } else if (granularity === "yearly") {
      return data.map((item) => ({
        period: `Year ${item.year}`,
        count: item.count,
      }));
    }
    return [];
  };

  return (
    <>
      {/* Form for selecting startDate, endDate, and granularity */}
      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
        <label className="label-filter">Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}  // Update startDate
        />
        <label className="label-filter">End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}  // Update endDate
        />
        <label className="label-filter">Granularity: </label>
        <select
          value={granularity}
          onChange={(e) => setGranularity(e.target.value)}  // Update granularity
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </form>

      {/* Bar chart with data */}
      <ResponsiveBar
        data={data}  // Data for the chart
        keys={["count"]}  // Display the "count" key
        indexBy="period"  // Group by period (week, month, year)
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}  // Color scheme
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Period",  // X-axis label
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Count",  // Y-axis label
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}  // Disable labels on the bars
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in period: " + e.indexValue;
        }}
      />
    </>
  );
};

export default BarChart;
