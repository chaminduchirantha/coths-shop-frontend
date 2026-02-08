import { lazy, Suspense } from "react"
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom"
import Header from "./components/Header"
import { AuthProvider } from "./context/authContext"

const Home = lazy(() => import("./pages/home"))
const About = lazy(() => import("./pages/About"))
const Collection = lazy(() => import("./pages/Collection"))
const Register = lazy(() => import("./pages/RegisterPage"))
const Login = lazy(() => import("./pages/loginPage"))


function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideHeader = location.pathname === '/register' || location.pathname === '/login';

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
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App