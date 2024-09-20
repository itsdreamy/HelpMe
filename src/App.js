import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./scenes/login"
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Forgotpass from "./scenes/forgotpass";
import Mitra from "./scenes/users/mitra";
import Users from "./scenes/users/users";
import Serabutan from "./scenes/kategori bantuan/serabutan";
import Elektronik from "./scenes/kategori bantuan/elektronik";
import Rumah from "./scenes/kategori bantuan/rumah";
import Kendaraan from "./scenes/kategori bantuan/kendaraan";
import LoginRedirect from "./components/loginredirect";
import NewKendaraan from "./scenes/form/kendaraan";
import NewElektronik from "./scenes/form/elektronik";
import NewSerabutan from "./scenes/form/serabutan";
import NewRumah from "./scenes/form/rumah";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation(); // Get current route location
  const hiddenPaths = ['/login', '/forgotpassword'];

  // Check if the current pathname is one of the hidden paths
  const showSidebarAndTopbar = !hiddenPaths.includes(location.pathname);

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="app">
          {showSidebarAndTopbar && <Sidebar />}
              <main className="content">
              {showSidebarAndTopbar && <Topbar />}
                <Routes>
                  <Route path="/" element={<LoginRedirect />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgotpassword" element={ <Forgotpass /> } />
                  <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={ <Dashboard /> } />
                  <Route path="/mitra" element={ <Mitra /> } />
                  <Route path="/users" element={ <Users /> } />
                  <Route path="/serabutan" element={ <Serabutan /> } />
                  <Route path="/elektronik" element={ <Elektronik /> } />
                  <Route path="/rumah" element={ <Rumah /> } />
                  <Route path="/kendaraan" element={ <Kendaraan /> } />
                  <Route path="/kendaraan/create" element={ <NewKendaraan /> } />
                  <Route path="/elektronik/create" element={ <NewElektronik /> } />
                  <Route path="/serabutan/create" element={ <NewSerabutan /> } />
                  <Route path="/rumah/create" element={ <NewRumah /> } />
                  </Route>
                </Routes>
              </main>   
        </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
