import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from '../../components/BarChart'; 
import PieChart from "../../components/PieChart";  
import { fetchClientAndMitraStats } from "../../api/mockData";  
import { useState, useEffect } from "react";  
import Preloader from "../../components/Preloader"; 

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State for data loading
  const [chartLoading, setChartLoading] = useState(true); // State for chart loading
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await fetchClientAndMitraStats();
        console.log('Data: ', response);
        setData(response.all); // Adjust according to your data structure
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error:", err);
      } finally {
        setLoading(false); // Finish loading data regardless of success or failure
      }
    };

    fetchApi();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box gridColumn="span 7" gridRow="span 2" backgroundColor={colors.primary[400]}>
            <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                  Revenue Generated
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                  $59,342.32
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <BarChart isDashboard={true} />
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box gridColumn="span 5" gridRow="span 2" backgroundColor={colors.primary[400]}>
            <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                  Client VS Mitra
                </Typography>
                <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                  Total: {data}
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              {/* Pass the data to PieChart and handle chart loading completion */}
              <PieChart isDashboard={true} data={data} />
            </Box>
          </Box>
        </Box>
    </Box>
  );
};

export default Dashboard;
