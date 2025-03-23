import { useState } from 'react'
import { uploadImage } from '../services'
import '../styles-pages/uploadprescription.css'

function MedicineScanner() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await uploadImage(formData)
      setResult(response.data)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
    setLoading(false)
  }

  return (
    <div className='medicine-scanner-container'>
      <h1 className='medicine-scanner-title'>Prescription Scanner</h1>
      <h2>Upload the photo of your prescription here</h2>
      <input
        type='file'
        onChange={handleFileChange}
        className='medicine-scanner-input'
      />
      <button
        onClick={handleUpload}
        className='medicine-scanner-button'
        disabled={!file || loading}
      >
        {loading ? 'Processing...' : 'Upload & Scan'}
      </button>
      {result && (
        <div className='medicine-scanner-result'>
          <h2>Extracted Medicines:</h2>
          <table className='medicine-table'>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Generic Alternatives</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.generic_medicines).map(
                ([med, generics], idx) => (
                  <tr key={idx}>
                    <td>{med}</td>
                    <td>
                      {generics.length > 0
                        ? generics.join(', ')
                        : 'No alternatives found'}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export { MedicineScanner }
