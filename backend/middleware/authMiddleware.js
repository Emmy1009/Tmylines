import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ message: "Not authorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      console.log("Access denied")

      next();
    } catch (error) {
      console.error("Auth Error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

// role-based access
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .json({ message: "Forbidden: Access denied" });
        }
        console.log("Access denied")
        next();
    };
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
console.log(`User is saved name: ${user.name} and role: ${user.role}`)
    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.user = decoded; // { id, role }
    console.log(`User is saved name: ${req.user.id} and role: ${req.user.role}`)
    next();
  } catch (err) {
    console.error("❌ Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  console.log(`Access denied cus User has to be Admin and user is ${req.user.role}`)
  next();
};

export const isDeveloper = (req, res, next) => {
  if (req.user.role !== "developer" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Developers/Admins only." });
  }
  console.log(`User: ${req.user.name} should be a developer and role: ${req.user.role}`)
  next();
};
export { authorizeRoles };
