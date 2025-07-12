class AuthController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async register(req, res) {
    const { username, password } = req.body;

    try {
      const existingUser = await this.UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new this.UserModel({ username, password });
      await newUser.save();

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await this.UserModel.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token logic here (e.g., JWT)
      const token = this.generateToken(user);

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }

  generateToken(user) {
    return "generated_token";
  }
}

export default AuthController;
