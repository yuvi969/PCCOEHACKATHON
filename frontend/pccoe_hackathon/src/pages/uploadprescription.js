import { useState } from 'react'
import '../styles-pages/uploadprescription.css'
import { Uploadpdf } from '../services'
import { useNavigate } from 'react-router'

function Uploadprescription() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const navigate = useNavigate()
  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)

    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile.name)

      const formData = new FormData()
      formData.append('file', selectedFile)

      try {
        const response = await Uploadpdf(formData)
        console.log('Upload successful:', response.data)
        alert('File uploaded successfully!')
        navigate('/')
      } catch (error) {
        console.error('Upload failed:', error.response?.data || error)
        alert(error.response?.data?.msg || 'Upload failed!')
      }
    } else {
      alert('Please select a file first.')
    }
  }

  return (
    <div className='upload-container'>
      <h2>Upload Your Prescription</h2>
      <label
        className={`drop-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>
            Drag & Drop your prescription here or{' '}
            <span className='click-text'>click to select</span>
          </p>
        )}
        <input
          id='fileInput'
          type='file'
          className='file-input'
          onChange={handleFileChange}
        />
      </label>
      <button className='upload-button' onClick={handleUpload}>
        Upload
      </button>
    </div>
  )
}

export { Uploadprescription }
