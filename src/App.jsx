import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import AppRouter from "./routes/AppRouter";
import "./styles/global.css";
import "./styles/animation.css";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <BookingProvider>
                    <AppRouter />
                </BookingProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
