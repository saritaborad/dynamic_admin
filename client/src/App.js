import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import RoutesMain from "./RouteMain";
import "./style.scss";
import "./style2.scss";
import { ToastContainer } from "react-toastify";
import AppContextProvider from "./Context/AppContext";

function App() {
 return (
  <>
   <AppContextProvider>
    <ToastContainer autoClose={300} theme="light" position="top-right" />
    <RoutesMain />
   </AppContextProvider>
  </>
 );
}

export default App;
