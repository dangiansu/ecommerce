const User = require('../model/usermodel')
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    const bcrypt = require('bcrypt');
    const User = require('../models/User'); // Assuming you have a User model
    
    exports.register = async (req, res) => {
      try {
        const { fullname, email, password, mobile } = req.body;
    
        // Check for missing fields
        if (!fullname || !email || !password || !mobile) {
          return res.status(400).json({
            msg: 'All fields are required',
          });
        }
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            msg: 'User already exists',
            suggestion: 'Please use a different email address',
          });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
    
        // Create a new user
        const newUser = new User({
          fullname,
          email,
          password: hashedPassword,
          mobile,
        });
    
        // Save the user to the database
        await newUser.save();
    
        return res.status(201).json({
          msg: 'User registration successful',
          success: true,
          user: newUser,
        });
      } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
          msg: 'Server error',
        });
      }
    };
    
  };
  //login Api here
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for missing email or password
      if (!email || !password) {
        return res.status(400).json({
          msg: 'Both email and password are required',
          success: false,
          status: 400,
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({
          msg: 'User not found. Please register first.',
          success: false,
          status: 404,
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          msg: 'Incorrect password',
          success: false,
          status: 401,
        });
      }
      // Generate a JWT token
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.fullname,
        },
        process.env.PRIVATEKEY
      );
  
      return res.status(200).json({
        status: 200,
        success: true,
        token,
        fullname: user.fullname,
        _id: user._id,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        msg: 'Server error',
        status: 500,
      });
    }
  };
  