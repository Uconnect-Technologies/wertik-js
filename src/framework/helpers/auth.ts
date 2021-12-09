import bcrypt from "bcryptjs"

export const generateHashPassword = (password: string) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt)
  return hash
}

export const verifyPassword = async (tryingPassword, storedPassword) => {
  return await bcrypt.compareSync(tryingPassword, storedPassword)
}
