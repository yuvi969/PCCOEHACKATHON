import { useState } from 'react'
import '../styles-pages/uploadprescription.css'

function Uploadprescription() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragging, setDragging] = useState(false)

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

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading:', selectedFile.name)
      // Add API call here to send the file to the backend
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
        onClick={() => document.getElementById('fileInput').click()} // Clicking opens file selection
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
