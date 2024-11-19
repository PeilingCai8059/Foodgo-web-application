import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import ListAll from "./pages/ListAll/ListAll";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
    <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
       <Sidebar />
       <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/all' element={<ListAll />} />
          <Route path='/orders' element={<Orders />} />
       </Routes>
      </div>
     
    </>
  )
}
