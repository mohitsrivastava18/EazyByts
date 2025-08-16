
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Import axios for consistency

export const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute for testing, adjust to 300 for 5 minutes
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      const newOtp = [...otp];
      pasteArray.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteArray.length, 5)].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeLeft <= 0) {
      toast.error('OTP expired! Please request a new one');
      return;
    }
    const otpString = otp.join('');
    try {
      const res = await axios.post('https://eazybyts-znpn.onrender.com/api/v1/verify', { otp: otpString }, { withCredentials: true });
      toast.success(res.data.message || 'OTP verified successfully!');
      login(); // Update auth state
      navigate('/dashboard'); // Redirect immediately
    } catch (error) {
      console.error('OTP verification failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Verify OTP</h2>
        <p className={`mb-6 font-semibold ${timeLeft <= 30 ? 'text-red-500' : 'text-gray-600'}`}>
          Time left: {formatTime(timeLeft)}
        </p>
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-semibold outline-indigo-500 focus:border-indigo-500"
              disabled={timeLeft <= 0}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={timeLeft <= 0}
          className={`mt-6 text-xl cursor-pointer w-full ${
            timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          } text-white font-medium py-2 rounded-lg transition`}
        >
          Verify
        </button>
      </form>
    </div>
  );
};
