import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import BarChart from '../../components/BarChart';
import PieChart from "../../components/PieChart";
import { fetchClientAndMitraStats } from "../../api/mockData";
import { useState, useEffect } from "react";
import Preloader from "../../components/Preloader"; // Import Preloader component

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetchClientAndMitraStats();
        console.log('Data: ', response);
        setData(response.all); // Assuming `response.all` contains the necessary data
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error:", err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or in case of error
      }
    };

    fetchApi();
  }, []);

  // Log the data to check its structure
  console.log("Dashboard Data:", data);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* Display Preloader during loading */}
      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <Typography color="error">{error}</Typography> // Show error message if any
      ) : (
        // Display the content once data is loaded
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1: Uncomment and use as needed */}
          {/* ROW 2 */}
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
              {/* Pass the data to PieChart explicitly */}
              <PieChart isDashboard={true} data={data} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
