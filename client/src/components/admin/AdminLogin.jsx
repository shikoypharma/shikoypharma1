import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ username, password });
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Portal</h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">Sign in with admin username and password</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-2">
            {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 text-sm text-slate-500 dark:text-slate-300">Logging in...</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/60"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/60"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-primary text-white dark:text-white py-2 rounded-md font-medium disabled:opacity-60"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-400">Only the authorised admin can access this portal.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
