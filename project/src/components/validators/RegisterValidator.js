import { toast } from 'react-toastify';

function registerValidator (username 
    , password, confirmPassword ) {
        if (username.length < 4 || username === '') {
            toast.error('Username must be at least 4 characters long')
            return false
          }

          if (password.length < 8 || password === '') {
            toast.error('Password must be at least 8 characters long')
            return false
          }
          if (password !== confirmPassword) {
            toast.error("Passwords didn't match")
            return false
          }




  return true
}

export default registerValidator;