import AdminLayout from "../../components/layout/AdminLayout";
import Sidebar from "../../Components/ui/sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHeaderTitle } from "../../redux/layoutSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { FiExternalLink } from "react-icons/fi";

const AdminHeader = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const pageTitle = useSelector((state) => state.layout.headerTitle);
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="lg:hidden w-16" />
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isDarkMode
              ? 'bg-neutral-800 text-white hover:bg-neutral-700'
              : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
          }`}
        >
          <FiExternalLink size={16} />
          <span className="hidden sm:inline">View Portfolio</span>
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center`}>
            <span className="text-white font-semibold">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="hidden md:block">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{user?.username || 'Admin'}</p>
            <p className="text-xs text-neutral-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLayoutWrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // Set header title based on route
    const path = location.pathname;
    if (path.includes('dashboard')) dispatch(setHeaderTitle('Dashboard'));
    else if (path.includes('personal-info')) dispatch(setHeaderTitle('Personal Information'));
    else if (path.includes('skills')) dispatch(setHeaderTitle('Skills Management'));
    else if (path.includes('projects')) dispatch(setHeaderTitle('Projects Management'));
    else if (path.includes('certificates')) dispatch(setHeaderTitle('Certificates Management'));
    else if (path.includes('education')) dispatch(setHeaderTitle('Education Management'));
    else if (path.includes('messages')) dispatch(setHeaderTitle('Messages'));
    else if (path.includes('analytics')) dispatch(setHeaderTitle('Analytics'));
  }, [location.pathname, dispatch]);
  return (
    <AdminLayout sidebar={<Sidebar />} header={<AdminHeader />}>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminLayoutWrapper;
