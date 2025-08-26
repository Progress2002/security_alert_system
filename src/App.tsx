import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import { Bounce, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <Routes>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="admin/sign-in" element={<AdminSignIn />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="history" element />
            </Route>
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
