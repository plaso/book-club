const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const REQUIRED_FIELD_ERROR = "Campo requerido";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      trim: true,
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      trim: true,
      unique: true,
      match: [EMAIL_REGEX, "Introduce un email válido"]
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      minLength: [8, "Password must be at least 8 characters long"],
    },
  }
)

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then(hash => {
        this.password = hash;
        next()
      })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function(passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;