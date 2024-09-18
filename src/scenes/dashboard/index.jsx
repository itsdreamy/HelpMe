import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            
            </Box>
                {/* GRID & CHARTS */}
                <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                >
            {/* ROW 1 */}
            <Box
            gridColumn="span 3"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.primary[400]}                    
            >
                <StatBox
                title="12.361"
                subtitle="Emails Sent"
                progress="0.75"
                increase="+14%"
                icon={
                    <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                    />                    
            </Box>
            {/* ROW 1 */}
            <Box
            gridColumn="span 3"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.primary[400]}                    
            >
                <StatBox
                title="431.225"
                subtitle="Sales Obtained"
                progress="0.5"
                increase="+21%"
                icon={
                    <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />                    
            </Box>
            {/* ROW 1 */}
            <Box
            gridColumn="span 3"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.primary[400]}                    
            >
                <StatBox
                title="32.441"
                subtitle="New Clients"
                progress="0.30"
                increase="+5%"
                icon={
                    <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />                    
            </Box>
            {/* ROW 1 */}
            <Box
            gridColumn="span 3"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.primary[400]}                    
            >
                <StatBox
                title="12.361.927"
                subtitle="Traffic Inbound"
                progress="0.80"
                increase="+43%"
                icon={
                    <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
                />                    
            </Box>

            {/* ROW 2 */}
            <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
        gridColumn="span 5"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
    >
        <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
        >
        <Box>
            <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            >
            Revenue Generated
            </Typography>
            <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
            >
            $59,342.32
            </Typography>
        </Box>
        </Box>
        <Box height="250px" m="-20px 0 0 0">
        <PieChart isDashboard={true} />
        </Box>
    </Box>
    </Box>
    </Box>
    )    
}

export default Dashboard;