import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { fetchClientAndMitraStats } from "../api/mockData";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stats = await fetchClientAndMitraStats();
      // eslint-disable-next-line no-sequences
      if ('start', stats) {
        setData([
          {
            id: stats.client_count,
            label: "Client",
            value: stats.client_count,
            color: "white",
          },
          {
            id: stats.mitra_count,
            label: "Mitra",
            value: stats.mitra_count,
            color: "hsl(162, 70%, 50%)",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsivePie
  data={data}
  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
  innerRadius={0.5}
  padAngle={0.7}
  cornerRadius={3}
  activeOuterRadiusOffset={8}
  borderColor={{
    from: "color",
    modifiers: [["darker", 0.2]],
  }}
  arcLinkLabelsSkipAngle={10}
  arcLinkLabelsTextColor="#fff"
  arcLinkLabelsThickness={2}
  arcLinkLabelsColor={{ from: "color" }}
  enableArcLabels={false}
  arcLabelsRadiusOffset={0.4}
  arcLabelsSkipAngle={7}
  arcLabelsTextColor={{
    from: "color",
    modifiers: [["darker", 2]],
  }}
  tooltip={() => null}
  legends={[
    {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 56,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 18,
      itemTextColor: "#fff",
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: "circle",
    },
  ]}
/>
  );
};

export default PieChart;
