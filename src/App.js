// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ThemeSettings from "./components/settings";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={true} />
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
