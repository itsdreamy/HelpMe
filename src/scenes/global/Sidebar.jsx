import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTipOutlined"; // Ikon default untuk kategori
import { logout, aboutMe } from "../../api/authApi";
import { listCategory } from "../../api/mockData";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// Component untuk item sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState("");
  const [categories, setCategories] = useState([]); // Tambahkan state untuk menyimpan data kategori
  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = await logout();
    if (data) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await aboutMe();
      if (data && data.user) {
        setUsername(data.user.username);
        setRole(data.user.role);
        setProfile("https://6cc390e50272f9739be466219fe4343c.serveo.net/" + data.user.image_profile);
      }
    };

    // Fetch daftar kategori dari API
    const fetchCategoryList = async () => {
      const data = await listCategory();
      if (data && data.data) {
        setCategories(data.data); // Simpan daftar kategori ke state
      }
    };

    fetchUserData();
    fetchCategoryList();
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold" }}
                  color={colors.grey[100]}
                >
                  HelpMe !
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profile}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Bagian Users */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Kelola Mitra"
              to="/mitra"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Kelola Pengguna"
              to="/users"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Bagian Dinamis Kategori Bantuan */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Kategori Bantuan
            </Typography>

            {/* Map categories */}
            {categories.map((category) => (
              <Item
                key={category.id}
                title={"Bantuan " + category.name}
                to={`/${category.name.toLowerCase()}`}
                icon={<PrivacyTipIcon />} // Gunakan icon yang sesuai
                selected={selected}
                setSelected={setSelected}
              />
            ))}

            {/* LOGOUT ITEM */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Logout
            </Typography>
            <MenuItem
              title="Logout"
              icon={<LogoutOutlinedIcon />}
              onClick={handleLogout}
              style={{ color: colors.grey[100] }}
            >
              <Typography>Logout</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
