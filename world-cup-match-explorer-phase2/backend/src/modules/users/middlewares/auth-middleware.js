import jwt from "jsonwebtoken";

// roles parameter
const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errorMessage: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.account = decoded; 

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ errorMessage: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ errorMessage: "Invalid token" });
    }
  };
};

export default authorize;
