import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {Route, Routes, useLocation} from "react-router-dom"; // Removed BrowserRouter here
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import KategoriBantuan from "./scenes/table";
import NewProblem from "./scenes/form";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Forgotpass from "./scenes/forgotpass";
import Usaha from "./scenes/usaha";
import Mitras from "./scenes/users/users/mitras";
import Users from "./scenes/users/users/client";
import LoginRedirect from "./components/loginredirect";
import PrivateRoute from "./components/PrivateRoute";
import Newpass from "./scenes/newpass";
import Success from "./components/200";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const hiddenPaths = ['/login', '/forgotpassword', '/success', '/newpassword', '/serabutan/create', '/elektronik/create', '/kendaraan/create', '/rumah/create', '/kendaraan/create', '/elektronik/create', '/personal/create', '/password-reset/:token'];

  const showSidebarAndTopbar = !hiddenPaths.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebarAndTopbar && <Sidebar />}
          <main className="content">
            <Routes>
              <Route path="/" element={<LoginRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<Forgotpass />} />
              <Route path="/password-reset/:token" element={<Newpass />} />
              <Route path="/success" element={<Success />} />

              {/* Protect the routes that require authentication */}
              // Tambahkan route dinamis di sini
              <Route
                path="/:category"
                element={<PrivateRoute element={<KategoriBantuan />} />}
              />
              <Route
                path="/:category/problems"
                element={<PrivateRoute element={<NewProblem />} />}
              />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route
                path="/usaha"
                element={<PrivateRoute element={<Usaha />} />}
              />
              <Route
                path="/client"O
                element={<PrivateRoute element={<Users />} />}
              />
              <Route
                path="/mitras"
                element={<PrivateRoute element={<Mitras />} />}
              />
            </Routes>
          </main>   
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
