import React, { useState } from 'react';

function PhoneVerficationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      // Only allow digits and one character
      const newOtp = otp.substring(0, index) + value + otp.substring(index + 1);
      setOtp(newOtp);
      if (value.length === 1 && index < 5) {
        // Move focus to next input if a digit is entered
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput.focus();
      } else if (value.length === 0 && index > 0) {
        // Move focus to previous input if backspace is pressed
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput.focus();
      }
    }
  };

  const handlePaste = e => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = clipboardData.replace(/\D/g, '').substring(0, 6);
    setOtp(newOtp);
    for (let i = 0; i < newOtp.length; i++) {
      const input = document.getElementById(`otp-input-${i}`);
      input.value = newOtp.charAt(i);
    }
    if (newOtp.length < 6) {
      const nextInput = document.getElementById(`otp-input-${newOtp.length}`);
      nextInput.focus();
    }
  };

  const handleVerifyClick = () => {
    // Check if OTP is valid
    if (/^\d{6}$/.test(otp)) {
      alert('OTP verified!');
      setShowPopup(false);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 6; i++) {
      inputs.push(
        <input
          key={i}
          id={`otp-input-${i}`}
          type="text"
          maxLength="1"
          pattern="[0-9]*"
          value={otp.charAt(i) || ''}
          onChange={e => handleInputChange(e, i)}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="PhoneVerficationPopup">
      {showPopup ? (
        <div className="phone-verification-popup">
          <h2>Phone Verification</h2>
          <p>Enter the 6-digit OTP sent to your phone</p>
          <div className="otp-inputs" onPaste={handlePaste}>
            {renderInputs()}
          </div>
          <button onClick={handleVerifyClick}>Verify</button>
        </div>
      ) : (
        <button onClick={() => setShowPopup(true)}>Verify Phone</button>
      )}
    </div>
  );
}

export default PhoneVerficationPopup;
