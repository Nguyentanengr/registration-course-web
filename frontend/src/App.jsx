import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import RegisterCourse from "./components/pages/register/RegisterCourse";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route element={<MainLayout />}>
            <Route index element={<Login />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterCourse />} />
          </Route>

          {/* Not layout applied */}
          <Route path="*" element={<div>Page Error Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
