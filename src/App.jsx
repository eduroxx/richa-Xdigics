import { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    text: '',
  });

  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const pdf = new jsPDF();

  const getPdfFile = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError(''); // Clear previous error

    const { name, email, phone, text } = formData;

    // Adjust the coordinates and spacing as needed
    const startX = 20;
    const startY = 20;
    const lineHeight = 10;

    pdf.text(startX, startY, `Name: ${name}`);
    pdf.text(startX, startY + lineHeight, `Email: ${email}`);
    pdf.text(startX, startY + 2 * lineHeight, `Phone Number: ${phone}`);

    // Split text content into lines and add line breaks
    const textLines = pdf.splitTextToSize(`Text Field: ${text}`, pdf.internal.pageSize.width - 40);
    textLines.forEach((line, index) => {
      pdf.text(startX, startY + (3 + index) * lineHeight, line);
    });

    pdf.save('Test file -.pdf');
  };

  return (
    <>
    <h1>Xdigics Technologies Assessment</h1>
      <div className="form-container">
        <form id="myForm" onSubmit={(e) => getPdfFile(e)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            pattern="[A-Za-z0-9 ]+"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. name@gmail.com"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setEmailError('');
            }}
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="\+[0-9]{1,3} [0-9]{10}"
            placeholder="e.g. +91 1234567890"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <label htmlFor="textField">Text Field:</label>
          <textarea
            id="textField"
            name="textField"
            maxLength="500"
            placeholder="Upto 500 characters"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          ></textarea>

          <button id="FormButton" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
