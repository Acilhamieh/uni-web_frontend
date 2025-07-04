import AccessForm from '../components/AccessForm'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();

    return (
        <AccessForm
            register={true}
            onNavigateToSignup={() => navigate('/signup')}
        />
    )
}