import { ColorModeContext } from "./theme";
import {useMode} from "./theme";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Form from "./scenes/dashboard";
// import Bar from "./scenes/dashboard";
// import Pie from "./scenes/dashboard";
// import FAQ from "./scenes/dashboard";
function App() {
  const [theme, colorMode] = useMode();
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="app">
          <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/team" element={<Team />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/faq" element={<FAQ />} /> */}
                </Routes>
              </main>   
        </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
