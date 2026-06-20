import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../controllers/authController';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/admin" replace />;
}
