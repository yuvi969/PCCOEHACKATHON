import { useState } from 'react'
import '../styles-pages/uploadmanually.css'

function Uploadmanually() {
  const [medicines, setMedicines] = useState([''])

  const handleMedicineChange = (index, value) => {
    const updatedMedicines = [...medicines]
    updatedMedicines[index] = value
    setMedicines(updatedMedicines)
  }

  const addMedicineField = () => {
    setMedicines([...medicines, ''])
  }

  const removeMedicineField = (index) => {
    if (medicines.length > 1) {
      const updatedMedicines = medicines.filter((_, i) => i !== index)
      setMedicines(updatedMedicines)
    }
  }

  const handleSubmit = () => {
    console.log('Medicines:', medicines)
    // Add API call to send the entered medicines
  }

  return (
    <div className='manual-upload-container'>
      <h2>Enter Medicines Manually</h2>
      <p>Type the names of the prescribed medicines below.</p>

      <div className='medicine-list'>
        {medicines.map((medicine, index) => (
          <div key={index} className='medicine-input'>
            <input
              type='text'
              placeholder='Enter medicine name'
              value={medicine}
              onChange={(e) => handleMedicineChange(index, e.target.value)}
            />
            {medicines.length > 1 && (
              <button
                className='remove-btn'
                onClick={() => removeMedicineField(index)}
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>
      <div className='button-div'>
        <button className='add-btn' onClick={addMedicineField}>
          + Add More
        </button>

        <button className='submit-btn' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export { Uploadmanually }
