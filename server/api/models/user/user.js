const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { crypto } = require(`../../../env/${process.env.NODE_ENV}`);

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'avatar.png',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

/**
 * Hash a password
 * @param {String} password
 * @returns {String} Encrypted password string
 */
userSchema.methods.hash = password => {
  const salt = bcrypt.genSaltSync(crypto.saltRound);
  return bcrypt.hashSync(password, salt);
};

/**
 * Compare a password
 * @param {String} password
 * @returns {Boolean} true: Matched, false: Mismatched
 */
userSchema.methods.compare = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Transform the returned object
userSchema.set('toObject', {
  versionKey: false,
  transform(_, ret) {
    delete ret._id;
    delete ret.password;
  },
});

module.exports = mongoose.model('user', userSchema);
