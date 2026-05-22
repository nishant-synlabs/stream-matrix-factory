import { useNavigate } from 'react-router-dom';
import AdminAuthForm from '../components/AdminAuthForm';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = ({ email }) => {
    if (email === 'imaginebo81@gmail.com') {
      navigate('/admin', { replace: true });
    }
  };

  return <AdminAuthForm onSubmit={handleSubmit} />;
}
