import {registrarUsuarioService} from '../service/user.service.js'

export const registerUser = async (req, res) => {
  try {
    const { name, last_name, email, password } = req.body;
    await registrarUsuarioService({ name,  last_name , email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Perform user login logic here (e.g., validate credentials)
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};  