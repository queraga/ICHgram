import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/loginPage/LoginPage";
import { HomePage } from "../../pages/homePage/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "../layout/AppLayout";
import { ProfilePage } from "../../pages/profilePage/ProfilePage";
import { UserProfilePage } from "../../pages/userProfilePage/UserProfilePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/explore" element={<ExplorePage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
