export const validateProduct = (req, res, next) => {
  const { name, description, price, vendor } = req.body;

  if (!name || !description || !price || !vendor) {
    return res.status(400).json({
      message: "All fields are required: name, description, price, vendor",
    });
  }

  if (price < 0) {
    return res.status(400).json({
      message: "Price must be a positive number",
    });
  }

  next();
};

export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required: username, email, password",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  next();
};

export const validateVendor = (req, res, next) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({
      message: "All fields are required: name, email, phone, address",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  next();
};
