import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./assets/styles/Global";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./components/pages/login/Login";
import RegisterCourse from "./components/pages/register/RegisterCourse";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminLogin from "./components/pages/login/AdminLogin";
import SectionManagement from "./components/pages/section/SectionManagement";
import OpenSection from "./components/pages/open-section/OpenSection";
import StudentList from "./components/pages/student-list/StudentList";
import Schedule from "./components/pages/schedule/Schedule";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./components/pages/not-found/NotFound";


const App = () => {

  return (
    <>
      <GlobalStyles />
      <div className="app">
        <Routes>
          {/* Apply MainLayout */}
          <Route path="/portal" element={<MainLayout />}>
            <Route index element={<Login />} />
            <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />} >
              <Route path="/portal/dang-ky" element={<RegisterCourse />} />
              <Route path="/portal/thoi-khoa-bieu" element={<Schedule />} />
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />} >
              <Route path="/admin/hoc-phan" element={<SectionManagement />} />
              <Route path="/admin/mo-lop-hoc-phan" element={<OpenSection />} />
              <Route path="/admin/xem-danh-sach-lop" element={<StudentList />} />
            </Route>
          </Route>

          {/* Not layout applied */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
