import { useState } from 'react'
import './App.css'
import jsPDF from 'jspdf'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    text: ''
  })

  const pdf = new jsPDF();

  const getPdfFile = (e) => {
    e.preventDefault();

    console.log({ formData})

    pdf.text(20, 20, "Name: " + formData.name);
    pdf.text(20, 30, "Email: " + formData.email);
    pdf.text(20, 40, "Phone Number: " + formData.phone);
    pdf.text(20, 60, "Text Field:" + formData.text);


    pdf.save('testfile-.pdf')
  }


  
  return (
    <>
      <div class="form-container">
        <h1>Xdigics Assessment</h1>
        <form id="myForm" onSubmit={(e) => getPdfFile(e)}>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" pattern="[A-Za-z0-9 ]+" required value={formData.name}  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="e.g. name@gmail.com" required value={formData.email}  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" pattern="\+[0-9]{1,3} [0-9]{10}" placeholder="e.g. +91 1234567890" required value={formData.phone}  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/> 
            
            <label for="textField">Text Field:</label>
            <textarea id="textField" name="textField" maxlength="500" placeholder="Upto 500 characters" value={formData.text}  onChange={(e) => setFormData({ ...formData, text: e.target.value })}></textarea>

            <button id="FormButton">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
