const JWT = require("jsonwebtoken");

// Verify token
const verifyToken = (req, resp, next) => {
    let token = req.headers["authorization"];
    try {
        if (token) {
            token = token.split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, _) => {
                if (err) {
                    resp.status(403).json("Wrong or expired token!");
                } else {
                    next();
                };
            });
        } else {
            resp.status(403).json({ Result: "Not authorized. No token!" });
        };
    } catch (error) {
        console.error(error);
        resp.status(500).json({ Result: "An error occurred while processing your request!" });
    };
};

// Verify admin
const verifyAdmin = (req, resp, next) => {
    let token = req.headers["authorization"];
    try {
        if (token) {
            token = token.split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    resp.status(403).json({ Msg: "Wrong or expired token!" });
                } else {
                    // data = {id: newUserDetails._id, isAdmin: newUserDetails.isAdmin}
                    if (!data.isAdmin) {
                        resp.status(403).json({ Msg: "You are not admin!" });
                    };
                    next();
                };
            });
        } else {
            resp.status(403).json({ Msg: "Not authorization. No token!" });
        };
    } catch (error) {
        console.error(error);
        resp.status(500).json({ Msg: "An error occurred while processing your request!" });
    };
};

module.exports = {
    verifyToken,
    verifyAdmin
}