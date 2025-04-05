import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./components/pages/login/Login";
import RegisterCourse from "./components/pages/register/RegisterCourse";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminLogin from "./components/pages/login/AdminLogin";
import SectionManagement from "./components/pages/section/SectionManagement";
import OpenSection from "./components/pages/open-section/OpenSection";

const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route path="/portal" element={<MainLayout />}>
            <Route index element={<Login />} /> 
            <Route path="register" element={<RegisterCourse />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} /> 
            <Route path="/admin/hoc-phan" element={<SectionManagement />} />
            <Route path="/admin/mo-lop-hoc-phan" element={<OpenSection />} />
          </Route>

          {/* Not layout applied */}
          <Route path="*" element={<div>Page Error Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
