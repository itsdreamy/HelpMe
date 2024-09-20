import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {Route, Routes, useLocation} from "react-router-dom"; // Removed BrowserRouter here
import Login from "./scenes/login";
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
import Newpass from "./scenes/newpass";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const hiddenPaths = ['/login', '/forgotpassword', '/newpassword'];

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
              <Route path="/forgotpassword" element={<Forgotpass />} />
              <Route path="/newpassword" element={<Newpass />} />

              {/* Protect the routes that require authentication */}
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route
                path="/mitra"
                element={<PrivateRoute element={<Mitra />} />}
              />
              <Route
                path="/users"
                element={<PrivateRoute element={<Users />} />}
              />
              <Route
                path="/serabutan"
                element={<PrivateRoute element={<Serabutan />} />}
              />
              <Route
                path="/elektronik"
                element={<PrivateRoute element={<Elektronik />} />}
              />
              <Route
                path="/rumah"
                element={<PrivateRoute element={<Rumah />} />}
              />
              <Route
                path="/kendaraan"
                element={<PrivateRoute element={<Kendaraan />} />}
              />
              <Route
                path="/kendaraan/create"
                element={<PrivateRoute element={<NewKendaraan />} />}
              />
              <Route
                path="/elektronik/create"
                element={<PrivateRoute element={<NewElektronik />} />}
              />
              <Route
                path="/serabutan/create"
                element={<PrivateRoute element={<NewSerabutan />} />}
              />
              <Route
                path="/rumah/create"
                element={<PrivateRoute element={<NewRumah />} />}
              />
            </Routes>
          </main>   
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
