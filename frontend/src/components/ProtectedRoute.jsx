import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

/**
 * Wraps a route so only authenticated admins can access it.
 * Any other visitor is redirected to /login with the intended path stored in state.
 */
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
