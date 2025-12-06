import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-white">
            <h1 className="text-6xl font-bold mb-4 text-blue-500">404</h1>
            <p className="text-xl mb-8">Page Not Found</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
    );
};

export default NotFound;
