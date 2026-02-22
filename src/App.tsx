import { lazy, Suspense, useState, type ReactNode } from "react"
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider, useAuth } from "./context/authContext"
import AlertPopups from "./components/AlertPopups"

const Home = lazy(() => import("./pages/home"))
const About = lazy(() => import("./pages/About"))
const Collection = lazy(() => import("./pages/Collection"))
const Register = lazy(() => import("./pages/RegisterPage"))
const Login = lazy(() => import("./pages/loginPage"))
const AdminDashBoard = lazy(() => import("./pages/AdminDashboard"))
const FeedbackPage = lazy(() => import("./pages/FeeedbackPage"))
const ProductsPage = lazy(() => import("./pages/ProductsPage"))


type RequireAuthTypes = { children: ReactNode; roles?: string[] };

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {

  if (!showPopup) setShowPopup(true);
    return (
      <>
        {showPopup && <AlertPopups/>}
      </>
    );
  }


  if (roles && !roles.some((r) => user.roles?.includes(r))) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};



function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideHeader = location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/admin';

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="h-screen w-full flex items-center justify-center bg-slate-900">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium animate-pulse">Loading Cloth Shop...</p>
            </div>
          </div>
        }
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<RequireAuth roles={["ADMIN"]}><AdminDashBoard /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedbacks" element={<RequireAuth roles={["USER"]}><FeedbackPage /></RequireAuth>} />
            <Route path="/product" element={<ProductsPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App