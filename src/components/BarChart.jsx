import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { fetchUserStatsByGranularity } from "../api/mockData"; // Import fungsi API
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [granularity, setGranularity] = useState("weekly"); // Default value for granularity
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadData = async () => {
      // Fetch data only if both startDate and endDate are provided
      if (startDate && endDate) {
        const response = await fetchUserStatsByGranularity(
          granularity,
          startDate,
          endDate
        );
        if (response && response.data) {
          const formattedData = formatDataForChart(response.data, granularity); // Olah data di sini
          setData(formattedData);
        }
      }
    };
    loadData();
  }, [granularity, startDate, endDate]);

  const formatDataForChart = (data, granularity) => {
    // Olah data berdasarkan granularity (weekly, monthly, yearly)
    if (granularity === "weekly") {
      return data.map((item) => ({
        period: `Week ${item.period}`, // Contoh mengubah 'period' menjadi lebih readable
        count: item.count,
      }));
    } else if (granularity === "monthly") {
      return data.map((item) => ({
        period: `Month ${item.month} - ${item.year}`, // Ubah 'month' dan 'year' jadi string
        count: item.count,
      }));
    } else if (granularity === "yearly") {
      return data.map((item) => ({
        period: `Year ${item.year}`, // Ubah 'year' jadi string
        count: item.count,
      }));
    }
    return [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data fetching handled by useEffect
  };

  return (
    <>
        <ResponsiveBar
          data={data}
          keys={["count"]} // 'count' sesuai dengan hasil API
          indexBy="period" // 'period' sesuai dengan hasil olahan data
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
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
            tickRotation: 0,
            legend: isDashboard ? undefined : "Period",
            legendPosition: "middle",
            legendOffset: 32,
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
