# Admin Google Login Setup

This guide walks you through setting up Google OAuth authentication for the admin portal. Only one admin email address is allowed access.

## 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → Create **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:5000` (development)
   - `http://localhost:3000` (client dev)
   - `https://yourdomain.com` (production)
7. Copy the **Client ID** — you'll need this for `GOOGLE_CLIENT_ID`

## 2. Set Environment Variables

In `server/.env`, add:

```env
GOOGLE_CLIENT_ID=your-client-id-from-google-console.apps.googleusercontent.com
ADMIN_EMAIL=admin@yourdomain.com
JWT_SECRET=your-long-random-secret-string
NODE_ENV=development
```

Replace:
- `your-client-id-from-google-console.apps.googleusercontent.com` with your actual Google Client ID
- `admin@yourdomain.com` with the single admin email address allowed
- `your-long-random-secret-string` with a secure random string (e.g., `openssl rand -hex 32`)

## 3. Restart the Server

```bash
cd server
npm install  # if first time
npm start
```

## 4. Client-Side Integration

### Install Google Sign-In

In `client/package.json`, ensure you have Google Sign-In library or use the Web component:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### Create Admin Login Component

Create a Google login button that calls `/api/auth/google` with the credential token:

```jsx
// admin/AdminLogin.jsx
import { useEffect, useRef } from 'react';
import axios from 'axios';

export const AdminLogin = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(containerRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
      });
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/google',
        { credential: response.credential },
        { withCredentials: true }
      );

      console.log('Admin logged in:', res.data);
      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message);
      alert('Access denied. This Google account is not authorized as admin.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Admin Portal</h1>
      <div ref={containerRef}></div>
    </div>
  );
};
```

### Set Client Environment Variable

In `client/.env`:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-from-google-console.apps.googleusercontent.com
```

## 5. Test the Flow

1. **Sign In**: Click Google sign-in button on admin login page
2. **Auth Cookie**: Browser receives `jwt` cookie (httpOnly, secure)
3. **Protected Routes**: Any POST/PUT/DELETE to `/api/*` routes now requires:
   - Valid JWT cookie
   - User email matching `ADMIN_EMAIL`
4. **Verify**: Call `GET /api/auth/me` — should return the authenticated admin's details

### Example cURL test:

```bash
# After logging in (cookie stored), test a protected route:
curl -X GET http://localhost:5000/api/auth/me \
  --cookie "jwt=<your-jwt-cookie>" \
  -H "Content-Type: application/json"
```

## 6. Admin Routes Now Protected

All write operations require the admin to be logged in with the authorized email:

- `POST /api/global` — Create global data
- `PUT /api/products/:id` — Edit product
- `DELETE /api/gallery/:id` — Delete gallery item
- `POST /api/inquiry` — List inquiries (admin only now)
- ...and all other admin/create/update/delete routes

## 7. Logout

```bash
POST /api/auth/logout
```

Clears the JWT cookie.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Access denied. This Google account is not authorized" | Verify `ADMIN_EMAIL` in `.env` matches the Google account email (case-insensitive) |
| JWT token issues | Check `JWT_SECRET` is set and consistent across restarts |
| CORS errors on client | Ensure `withCredentials: true` in axios config; server CORS allows origin |
| Google credential empty | Ensure Google Sign-In script loaded and button rendered before user clicks |

## Security Notes

- ✅ Only the configured `ADMIN_EMAIL` can access admin routes
- ✅ JWT tokens expire in 30 days
- ✅ Cookies are `httpOnly` (not accessible to JavaScript)
- ✅ In production, use `secure: true` (HTTPS only)
- ✅ All admin mutations (`POST`, `PUT`, `DELETE`) require authentication + admin role
