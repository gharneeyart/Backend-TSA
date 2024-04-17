// import express
import express from 'express'
import { forgotPassword, login, resetPassword, signUp } from '../controllers/auth.js'
import { upload } from '../helpers/multer.js'
import { deleteUser, getAllUsers, getOneUser, updateUser, updateUserRole } from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/auth.js'

// const isLoggedIn = (req, res, next) => {
//     console.log("Is logged in");
//     const auth = true
// }
// create express router
const router = express.Router()

// define your routes
router.post('/login', login)
router.post('/signup', upload.single('image'), signUp)// the 'image' is coming from whatever u call ur image in the user model
router.get('/users', getAllUsers)
router.get('/user/:userId', getOneUser)
router.put('/update', isLoggedIn, upload.single("image"), updateUser)
router.delete('/:userId', deleteUser)
router.post("/user/role", isLoggedIn,  updateUserRole)

// forgot password and reset password
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
// signup and login are post requests and it can't be tested on the browser
// browser is always interested in GET requests ONLY except you use a Third party like axios
// export the router
export default router
// Then u go to the index page