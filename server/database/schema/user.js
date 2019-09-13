const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true, //唯一字段
    required: true,
    type: String,
  },
  email: {
    unique: true, //唯一字段
    required: true,
    type: String,
  },
  password: {
    unique: true, //唯一字段
    type: String,
  },
  loginAttempts: {
    type: String,
    required: true,
    default: 0,
  },
  role: {
    type: String,
    default: 'user'
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
  }
})
// 时间处理
userSchema.pre('save', function (next) {
  if (this.isNew) { //新数据时间赋值
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else { //旧数据更新时间
    this.meta.updatedAt = Date.now()
  }
  next()
})
// 密码加密
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()   //判断密码没有更改直接return
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next()
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error)

      this.password = hash
      next()
    })
  })
})

userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

userSchema.methods = {
  comparePassword: (_password, password) => { // 登录密码对比
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttepts: (user) => {  //登录次数过多锁定
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })

      }
    })
  }
}

mongoose.model('User', userSchema)