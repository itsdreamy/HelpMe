import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from '../../components/BarChart'; 
import PieChart from "../../components/PieChart";  
import { fetchClientAndMitraStats } from "../../api/mockData";  
import { useState, useEffect } from "react";  
import Preloader from "../../components/Preloader"; 

const Dashboard = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await fetchClientAndMitraStats();
        setData(response.all);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const dashboardStyle = {
    width: isCollapsed ? "calc(100% - 50px)" : "calc(100% - 77px)", // Adjust based on sidebar size
    marginLeft: isCollapsed ? "50px" : "50px", // Adjust based on sidebar size
    transition: "width 0.3s ease", // Smooth transition when the sidebar is toggled
  };

  return (
    <Box style={dashboardStyle} m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
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
            <PieChart isDashboard={true} data={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
