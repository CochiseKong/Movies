import mongoose from 'mongoose'

const User = mongoose.model('User')
const Movies = mongoose.model('Movie')

export async function checkPassword(email, password) {
  let match = false

  const user = await User.findOne({ email: email }).exec()
  
  if (user) { 
    match = await user.comparePassword(password, user.password)
  }

  console.log(user);
  console.log(match);
  
  return {
    match,
    user
  }
}

export async function findOneRemove(id) {

  const movie = await Movies.findOne({ _id: id }).exec()
  if (movie) { 
    await movie.remove()
  }
 
}