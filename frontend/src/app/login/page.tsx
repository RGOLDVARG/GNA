'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/otp/request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setMessage('A 6-digit code has been sent to your email.');
      } else {
        setError(data.error || 'Failed to send code.');
      }
    } catch (err) {
      setError('Connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/otp/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp })
      });

      const data = await res.json();
      if (res.ok) {
        login(data.access, data.refresh);
      } else {
        setError(data.error || 'Invalid or expired code.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      {/* Left Column: Illustration and Quote */}
      <div className="left-column">
        <div className="gradient-circle"></div>
        
        <div className="hero-content">
          <div className="logo-box">
            <img 
              src="/images/gna_logo.svg" 
              alt="GNA Logo" 
              className="logo-img"
            />
          </div>
          
          <div className="association-name">
            <span className="assoc-full">Global Neurodiversity Association</span>
          </div>

          <p className="hero-desc">
            Join the elite network of specialists dedicated to neurodiversity excellence and global ethical standards.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="right-column">
        
        <div className="form-box">
          <h2 className="form-title">
            {step === 'email' ? 'Welcome back' : 'Check your email'}
          </h2>
          <p className="form-desc">
            {step === 'email' 
              ? 'Enter your email address to receive a secure login code.' 
              : `We've sent a 6-digit code to ${email}`}
          </p>

          <form onSubmit={step === 'email' ? handleRequestOtp : handleVerifyOtp} className="login-form">
            {error && (
              <div className="alert-error">
                {error}
              </div>
            )}

            {message && (
              <div className="alert-success">
                {message}
              </div>
            )}
            
            {step === 'email' ? (
              <div className="input-group">
                <label className="label">Email Address</label>
                <div className="input-wrapper">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="input" 
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="input-group">
                <label className="label">Verification Code</label>
                <div className="input-wrapper otp-wrapper">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000" 
                    className="input otp-input" 
                    required
                    autoFocus
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep('email')}
                  className="switch-btn"
                >
                  ← Use a different email
                </button>
              </div>
            )}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : (step === 'email' ? 'Send Login Code' : 'Verify & Log In')}
            </button>
          </form>

          <div className="register-hint">
             Don't have an account? <Link href="/register" className="link">Create one now</Link>
          </div>
        </div>
        
        <div className="footer-links">
           <Link href="#">Terms</Link>
           <Link href="#">Privacy</Link>
           <Link href="#">Help</Link>
        </div>

      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          background-color: #FFFFFF;
          color: #120A2B;
          font-family: 'Inter', sans-serif;
        }
        .left-column {
          flex: 1;
          background-color: #FAF8F5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          border-right: 1px solid #EEEEEE;
          position: relative;
          overflow: hidden;
        }
        .gradient-circle {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 209, 255, 0.05) 0%, transparent 70%);
        }
        .hero-content {
          max-width: 440px;
          text-align: center;
          position: relative;
          z-index: 1;
          /* Ensure a consistent starting point for alignment */
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 40px;
        }
        .logo-box {
          margin-bottom: 20px;
        }
        .logo-img {
          width: 160px;
          margin: 0 auto;
          display: block;
        }
        .association-name {
          margin-bottom: 28px;
        }
        .assoc-full {
          display: block;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #120A2B;
          line-height: 1.4;
        }
        .hero-desc {
          font-size: 17px;
          color: #666;
          line-height: 1.6;
          font-weight: 400;
        }
        .right-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          position: relative;
          overflow-y: auto;
        }
        .form-box {
          max-width: 400px;
          width: 100%;
          /* Matching the hero-content alignment */
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 40px;
        }
        .form-title {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 12px;
          text-align: left;
          letter-spacing: -0.02em;
        }
        .form-desc {
          color: #666;
          margin-bottom: 40px;
          font-size: 16px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .alert-error {
          padding: 16px;
          background-color: #FFEBEB;
          color: #D8000C;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(216,0,12,0.1);
        }
        .alert-success {
          padding: 16px;
          background-color: #F0F9FF;
          color: #0369A1;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(3,105,161,0.1);
        }
        .label {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #333;
        }
        .input-wrapper {
          border: 1px solid #CCCCCC;
          border-radius: 8px;
          padding: 12px;
        }
        .otp-wrapper {
          letter-spacing: 0.5em;
          text-align: center;
        }
        .input {
          width: 100%;
          border: none;
          outline: none;
          font-size: 16px;
          color: #120A2B;
          background: transparent;
        }
        .otp-input {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
        }
        .switch-btn {
          background: none;
          border: none;
          color: #3A0F7E;
          font-size: 14px;
          font-weight: 700;
          margin-top: 16px;
          cursor: pointer;
        }
        .submit-btn {
          background-color: #3A0F7E;
          color: white;
          padding: 18px;
          border-radius: 12px;
          border: none;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.2s ease;
          box-shadow: 0 10px 15px -3px rgba(58, 15, 126, 0.2);
        }
        .submit-btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        .register-hint {
          margin-top: 40px;
          text-align: center;
          font-size: 15px;
          color: #666;
        }
        .link {
          color: #3A0F7E;
          font-weight: 800;
          text-decoration: none;
        }
        .footer-links {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 32px;
          font-size: 13px;
          color: #999;
          font-weight: 500;
        }
        .footer-links a {
          text-decoration: none;
          color: inherit;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .left-column {
            padding: 40px 20px;
            border-right: none;
            border-bottom: 1px solid #EEEEEE;
            justify-content: center;
            min-height: auto;
          }
          .hero-content {
            min-height: auto;
            padding-top: 0;
          }
          .logo-img {
            width: 180px;
          }
          .hero-title {
            font-size: 22px;
          }
          .hero-desc {
            font-size: 15px;
          }
          .right-column {
            padding: 40px 20px 80px;
            justify-content: flex-start;
            min-height: auto;
          }
          .form-box {
            margin-top: 0;
            min-height: auto;
            padding-top: 0;
          }
          .form-title {
            font-size: 28px;
          }
          .footer-links {
            bottom: 20px;
            position: relative;
            margin-top: 40px;
          }
        }
      `}</style>
    </div>
  );
}
