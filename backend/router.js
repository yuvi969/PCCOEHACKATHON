const express = require('express')
const router = express.Router()
const multer = require('multer')
const Medicine = require('./medicine.js')
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('./userschema')
const axios = require('axios')
require('dotenv').config()

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ msg: 'Unauthorized' })
}

router.post('/process', (req, res) => {
  res.json({ message: 'Processing successful!' })
})

router.post('/logout', async (req, res) => {
  try {
    req.logOut((err) => {
      if (err) return res.status(500).json({ msg: 'Logout failed' })
      res.json({ msg: 'Logged out successfully' })
    })
  } catch (error) {}
})

router.post('/register', async (req, res) => {
  const { username, password, confirmpassword } = req.body

  const existinguser = await User.findOne({ username })
  if (existinguser) {
    return res.status(403).json({ msg: 'User already exists' })
  }

  const hashedpassword = await bcrypt.hash(password, 10)

  const new_user = new User({
    username,
    password: hashedpassword,
  })

  await new_user.save()
  res.status(200).json({ msg: 'User registered successfully' })
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ msg: 'Logged in successfully' })
})

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  },
})

const FormData = require('form-data')

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: 'No file uploaded or invalid file type.' })
  }

  try {
    // Create FormData object and append image file
    const formData = new FormData()
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    })

    // Forward the image to Flask for OCR processing
    const flaskResponse = await axios.post(
      'http://127.0.0.1:5000/upload',
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Important: Add required headers for FormData
        },
      }
    )

    res.json(flaskResponse.data) // Return Flask response to frontend
  } catch (error) {
    console.error('Error processing image:', error)
    res
      .status(500)
      .json({ error: 'Failed to process image.', details: error.message })
  }
})

router.post('/manualupload', async (req, res) => {
  let { medicinenames } = req.body

  if (!medicinenames) {
    return res.status(400).json({ msg: 'No medicines found' })
  }
  if (!Array.isArray(medicinenames)) {
    medicinenames = [medicinenames]
  }

  medicinenames = [...new Set(medicinenames.map((name) => name.trim()))]

  try {
    const existingMeds = await Medicine.find({ name: { $in: medicinenames } })

    if (existingMeds.length > 0) {
      return res.status(400).json({
        msg: 'Some medicines already exist in the database.',
        existing: existingMeds.map((med) => med.name),
      })
    }

    const newMeds = medicinenames.map((name) => ({ name }))
    await Medicine.insertMany(newMeds)

    res
      .status(201)
      .json({ msg: 'Medicines added successfully.', added: medicinenames })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
