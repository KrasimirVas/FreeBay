import { toast } from 'react-toastify';

function createPostValidator (title, 
     description, image ) {
  if (title.length < 3 || title === '') {
    toast.error('Title must be at least 3 characters long')
    return false
  }

  if (description.length < 20 || description.length > 200 || description === '') {
    toast.error('Description must be between 10 and 200 characters long')
    return false
  }
  if (image.length < 14 || !(image.startsWith('https://') || image.startsWith('http://'))) {
    toast.error('Image URL must be at least 14 characters long and must be valid URL')
    return false
  }




  return true
}

export default createPostValidator