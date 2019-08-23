const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 定义数据类型
const categorySchema = new Schema({
  name: {
    unique: true,
    type: String
  },
  num: {
    unique: true,
    type: Number
  },
  movies: {
    type: Object,
    ref: 'Movie'
  },
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

categorySchema.pre('save', function (next) {
  if (this.isNew) { //新数据时间赋值
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else { //旧数据更新时间
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Category', categorySchema)