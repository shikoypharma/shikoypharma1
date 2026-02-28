// Middleware to ensure the authenticated user is an admin
const isAdmin = (req, res, next) => {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';

    if (req.user && req.user.username && req.user.username.toLowerCase() === adminUsername.toLowerCase()) {
        return next();
    }

    res.status(403).json({ message: 'Not authorised as admin' });
};

export { isAdmin };
