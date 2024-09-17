import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./scenes/login"
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Elektronik from "./scenes/kategori bantuan/elektronik";
import Kendaraan from "./scenes/kategori bantuan/kendaraan";
import Rumah from "./scenes/kategori bantuan/rumah";
import Serabutan from "./scenes/kategori bantuan/serabutan";
import Mitra from "./scenes/users/mitra";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation(); // Get current route location
  const showSidebarAndTopbar = location.pathname !== '/login'; // Only show sidebar/topbar when not on login page
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="app">
          {showSidebarAndTopbar && <Sidebar />}
              <main className="content">
              {showSidebarAndTopbar && <Topbar />}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/elektronik" element={<Elektronik />} />
                  <Route path="/kendaraan" element={<Kendaraan />} />
                  <Route path="/rumah" element={<Rumah />} />
                  <Route path="/serabutan" element={<Serabutan />} />
                  <Route path="/mitra" element={<Mitra />} />
                </Routes>
              </main>   
        </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
