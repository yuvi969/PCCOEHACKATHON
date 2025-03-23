const express = require('express')
const router = express.Router()
const multer = require('multer')
const Medicine = require('./medicine.js')
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('./userschema')
require('dotenv').config()




const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ msg: 'Unauthorized' })
}



router.post('/register', async (req, res) => {
  const { username, password, confirmpassword} = req.body


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
  res.json({ msg: 'Logged in successfully'})
})


const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload',isAuth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }

  try {
    const response = await fetch('http://localhost:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
      },
      body: req.file.buffer,
    })

    const responseText = await response.text()
    console.log('Response from /process:', responseText)

    const result = JSON.parse(responseText)
    res.json(result)
  } catch (error) {
    console.error('Error forwarding PDF:', error)
    res
      .status(500)
      .json({ error: 'Failed to send PDF.', details: error.message })
  }
})

router.post('/manualupload',isAuth, async (req, res) => {
  let { medicinenames } = req.body

  if (!medicinenames) {
    return res.status(400).json({ msg: 'No medicines found' })
  }
  if (!Array.isArray(medicinenames)) {
    medicinenames = [medicinenames]
  }

  medicinenames = medicinenames
    .map((name) => name.trim())
    .filter((name) => name)

  const uniqueMedicines = [...new Set(medicinenames)]
  if (uniqueMedicines.length !== medicinenames.length) {
    return res
      .status(400)
      .json({ msg: 'Some medicines are duplicates within input.' })
  }

  try {
    const existingMeds = await Medicine.find({ name: { $in: uniqueMedicines } })

    if (existingMeds.length > 0) {
      return res.status(400).json({
        msg: 'Some medicines already exist in the database.',
        existing: existingMeds.map((med) => med.name),
      })
    }

    const newMeds = uniqueMedicines.map((name) => ({ name }))
    await Medicine.insertMany(newMeds)

    res
      .status(201)
      .json({ msg: 'Medicines added successfully.', added: uniqueMedicines })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
