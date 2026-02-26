import { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export const AdminLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setError(null);

    try {
      await googleLogin(response.credential);
      // Let the AuthContext and checkUserLoggedIn handle the state
      // On success, redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed. Please try again.');
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>Admin Portal</h1>
        <p className="subtitle">Sign in with your authorized Google account</p>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Logging in...</div>}

        <div className="google-button-container flex justify-center py-4">
          <GoogleLogin
            onSuccess={handleCredentialResponse}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <p className="info-text">
          Only the authorized admin email can access this portal.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
