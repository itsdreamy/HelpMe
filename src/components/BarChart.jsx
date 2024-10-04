import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { fetchUserStatsByGranularity } from "../api/mockData"; 
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  // const [granularity, setGranularity] = useState("monthly");
  // const [year, setYear] = useState("2024");
  // const [startYear, setStartYear] = useState("");
  // const [endYear, setEndYear] = useState("");
  const [granularity, setGranularity] = useState("yearly");
  const [year, setYear] = useState("");
  const [startYear, setStartYear] = useState("2011");
  const [endYear, setEndYear] = useState("2024");

  useEffect(() => {
    const loadData = async () => {
      let response = null;

      // Fetch data based on granularity
      if (granularity === "monthly" && year) {
        response = await fetchUserStatsByGranularity(granularity, year);
      } else if (granularity === "yearly" && startYear && endYear) {
        response = await fetchUserStatsByGranularity(granularity, null, startYear, endYear);
      }

      if (response && response.data) {
        setData(response.data);
        console.log(response);
      }
    };
    loadData();
  }, [granularity, year, startYear, endYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data fetching is handled by useEffect
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-filter">
        <label className="label-filter">
          Granularity:
          <select className="input-filter" value={granularity} onChange={(e) => setGranularity(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {granularity === "monthly" && (
          <label className="label-filter">
            Year:
            <input className="input-filter"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
            />
          </label>
        )}

        {granularity === "yearly" && (
          <>
            <label className="label-filter">
              Start Year:
              <input className="input-filter"
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="Enter start year"
              />
            </label>
            <label className="label-filter">
              End Year:
              <input className="input-filter"
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="Enter end year"
              />
            </label>
          </>
        )}

        <button type="submit">Fetch Data</button>
      </form>

      <ResponsiveBar
        data={data}
        keys={["count"]} // 'count' sesuai dengan hasil API
        indexBy="period" // 'period' sesuai dengan hasil olahan data
        margin={{ top: 53, right: 130, bottom: 67.5, left: 100 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: isDashboard ? undefined : "Period",
          legendPosition: "middle",
          legendOffset: 32,
          format: (d) => {
            if (typeof d === "string") {
              return d.substring(0, 3);
            } else {
              console.error("Unexpected type for period:", d);
              return d;
            }
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 20,
            justify: false,
            translateX: 0,
            translateY: 56,
            itemTextColor: "#fff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolShape: "circle",
          },
        ]}
        role="application"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in period: ${e.indexValue}`}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#ffffff",
              },
            },
          },
          legends: {
            text: {
              fill: "#ffffff",
            },
          },
        }}
      />
    </>
  );
};

export default BarChart;
