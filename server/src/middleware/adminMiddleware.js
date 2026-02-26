const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || req.user.username?.toLowerCase() !== adminEmail.toLowerCase()) {
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
};

export { isAdmin };
