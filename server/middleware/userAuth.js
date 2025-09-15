import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // lowercase in Node
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }

    // Expect "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
