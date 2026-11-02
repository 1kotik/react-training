import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes.ts";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AppRouter() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            {publicRoutes.map(route => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    key={route.path}
                />
            ))}
            {privateRoutes.map(route => (
                <Route
                    path={route.path}
                    element={user ? <route.component /> : <Navigate to="/login" replace />}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
    );
}

export default AppRouter;