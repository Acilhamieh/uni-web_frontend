import AccessForm from "../components/AccessForm.jsx";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    return (
        <AccessForm
            register={false}
            onNavigateToLogin={() => navigate('/login')}
        />
    )
}