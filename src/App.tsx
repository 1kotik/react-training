import NavBar from "./components/header/NavBar.tsx";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter.tsx";
import { ColorModeProvider } from './context/ColorModeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <ColorModeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar />
                    <AppRouter />
                </BrowserRouter>
            </AuthProvider>
        </ColorModeProvider>
    );
}

export default App;