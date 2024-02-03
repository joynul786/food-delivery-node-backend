const JWT = require ("jsonwebtoken");

// Verify token
const verifyToken = (req, resp, next) => {
    let token = req.headers["Authorization"];
    try {
        if (token) {
            token = token.split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, _) => {
                if (err) {
                    resp.status(403).send("Wrong or expired token!");
                } else {
                    next();
                };
            });
        } else {
            resp.status(403).send({ Result: "Not authorized. No token!" });
        };
    } catch (error) {
        console.error(error);
        resp.status(500).send({ Result: "An error occurred while processing your request!" });
    };
};

// Verify admin
const verifyAdmin = (req, resp, next) => {
    let token = req.headers["Authorization"];
    try {
        if (token) {
            token = token.split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    resp.status(403).send({ Msg: "Wrong or expired token!" });
                } else {
                    // data = {id: newUserDetails._id, isAdmin: newUserDetails.isAdmin}
                    if (!data.isAdmin) {
                        resp.status(403).send({ Msg: "You are not admin!" });
                    };
                    next();
                };
            });
        } else {
            resp.status(403).send({ Msg: "Not authorization. No token!" });
        };
    } catch (error) {
        console.error(error);
        resp.status(500).send({ Msg: "An error occurred while processing your request!" });
    };
};

module.exports = {
    verifyToken,
    verifyAdmin
}