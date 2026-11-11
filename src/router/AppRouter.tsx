import { Route, Routes, Navigate } from "react-router-dom";
import {publicRoutes, privateRoutes, RoutePaths} from "./routes.ts";
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
                    element={user ? <route.component /> : <Navigate to={RoutePaths.LOGIN} replace />}
                    key={route.path}
                />
            ))}
            <Route path="*" element={<Navigate to={RoutePaths.POSTS} replace />} />
        </Routes>
    );
}

export default AppRouter;