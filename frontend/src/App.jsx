import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home_bg from "./pages/Home_bg";
import Dashboard from "./sections/Dashboard";
import Login from "./sections/Login";
import Register from "./sections/Register";

function App() {
  return (
    <>
      <Router>
        <div className="bg-red-500">
          <div className="bg-imgd_d max-sm:bg-imgm_l h-[300px] w-full bg-cover bg-no-repeat bg-center">
            <div className=" w-full max-w-[800px] my-[0] mx-auto">
              <Home_bg />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
