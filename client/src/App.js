import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import RoutesMain from "./RouteMain";
import "./style.scss";
import "./style2.scss";
import { ToastContainer } from "react-toastify";

function App() {
 return (
  <>
   <ToastContainer autoClose={1000} theme="dark" position="top-center" />
   <RoutesMain />
  </>
 );
}

export default App;
