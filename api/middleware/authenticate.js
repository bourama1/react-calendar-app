const authenticate = async (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(401).send("Authentication failed");
    }
    next();
};

module.exports = authenticate;
