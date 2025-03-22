import axios from 'axios'

const URl = 'http://localhost:5000/api'

const uploadmanually = async (data) => {
  return await axios.post(`${URl}/manualupload`, data)
}

const Uploadpdf = async (data) => {
  return await axios.post(`${URl}/upload`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export { uploadmanually, Uploadpdf }
