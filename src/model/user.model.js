const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  phone: {
    type: String,
    unique:true,
    validate: {
      validator: value => validator.isMobilePhone(value, 'any', { strictMode: false }),
      message: 'Invalid phone number',
    },
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10); // 10 is the saltRounds, you can adjust it
  }

  next();
});

// Generate JWT token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRECT_KEY );  
    return token;
  };

// Exclude the password field when converting to JSON
userSchema.options.toJSON = {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  };  

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
