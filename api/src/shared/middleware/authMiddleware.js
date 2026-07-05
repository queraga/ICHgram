import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.slice("Bearer ".length);

    if (!token) {
      return res.status(401).json({
        message: "Token is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
