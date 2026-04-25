'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { Country, City } from 'country-state-city';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    profession: '',
    country: '',
    city: ''
  });
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const countryOptions = useMemo(() => {
    return Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: `${country.flag} ${country.name}`
    }));
  }, []);

  const cityOptions = useMemo(() => {
    if (!selectedCountry) return [];
    return City.getCitiesOfCountry(selectedCountry.value)?.map((city) => ({
      value: city.name,
      label: city.name
    })) || [];
  }, [selectedCountry]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/otp/request/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      if (res.ok) {
        setStep('otp');
        setMessage(`Verification code sent to ${formData.email}`);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to send verification code.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, code: otpCode, password: 'passwordless_dummy' })
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        const errorMsg = typeof data === 'object' ? Object.values(data).flat().join(', ') : 'Registration failed';
        setError(errorMsg);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-page">
      {/* Header */}
      <header className="header">
        <Link href="/">
          <img src="/images/gna_logo.svg" alt="GNA Logo" className="logo" />
        </Link>
        <Link href="/login" className="login-link">
          Log In
        </Link>
      </header>

      <div className="content">
        <div className="form-card">
          
          {step === 'details' ? (
            <>
              <h1 className="title">Join the GNA® Network</h1>
              <p className="subtitle">
                Connect with the world's leading neurodiversity experts. Start your professional journey today.
              </p>

              <form onSubmit={handleRequestOtp} className="form">
                {error && (
                  <div className="alert-error">
                    {error}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">First Name</label>
                    <input type="text" name="first_name" placeholder="John" value={formData.first_name} onChange={handleChange} className="input" required />
                  </div>
                  <div className="form-group">
                    <label className="label">Last Name</label>
                    <input type="text" name="last_name" placeholder="Doe" value={formData.last_name} onChange={handleChange} className="input" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Professional Email</label>
                  <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="input" required />
                </div>

                <div className="form-group">
                  <label className="label">Current Profession / Title</label>
                  <input type="text" name="profession" placeholder="e.g. Clinical Psychologist" value={formData.profession} onChange={handleChange} className="input" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Country</label>
                    <Select
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={(option) => {
                        setSelectedCountry(option);
                        setSelectedCity(null);
                        setFormData({ ...formData, country: option ? option.label.replace(/^[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]\s*/, '') : '', city: '' });
                      }}
                      styles={selectStyles}
                      placeholder="Select..."
                      isClearable
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">City</label>
                    <Select
                      options={cityOptions}
                      value={selectedCity}
                      onChange={(option) => {
                        setSelectedCity(option);
                        setFormData({ ...formData, city: option ? option.value : '' });
                      }}
                      styles={selectStyles}
                      placeholder="Select..."
                      isDisabled={!selectedCountry}
                      isClearable
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Sending Code...' : 'Register & Get Verification Code'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="title">Verify Your Email</h1>
              <p className="subtitle">
                {message}
              </p>

              <form onSubmit={handleFinalSubmit} className="form">
                {error && (
                  <div className="alert-error">
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="label">6-Digit Verification Code</label>
                  <input 
                    type="text" 
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000" 
                    className="input otp-input" 
                    required 
                    autoFocus
                  />
                  <button 
                    type="button" 
                    onClick={() => setStep('details')}
                    className="back-btn"
                  >
                    ← Back to details
                  </button>
                </div>

                <button type="submit" disabled={loading} className="verify-btn">
                  {loading ? 'Verifying...' : 'Complete Registration'}
                </button>
              </form>
            </>
          )}

          <div className="terms-hint">
             By registering, you agree to our <Link href="#" className="link">Terms of Service</Link> and <Link href="#" className="link">Privacy Policy</Link>.
          </div>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          background-color: #FAF8F5;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }
        .header {
          padding: 24px 60px;
          background-color: white;
          border-bottom: 1px solid #E5E5E5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          height: 40px;
        }
        .login-link {
          font-size: 15px;
          font-weight: 700;
          color: #3A0F7E;
          text-decoration: none;
        }
        .content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .form-card {
          max-width: 600px;
          width: 100%;
          background-color: white;
          border-radius: 32px;
          padding: 60px;
          box-shadow: 0 20px 60px rgba(18, 10, 43, 0.05);
        }
        .title {
          font-size: 36px;
          font-weight: 900;
          color: #120A2B;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .subtitle {
          font-size: 17px;
          color: #666;
          margin-bottom: 48px;
          line-height: 1.5;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .form-row {
          display: flex;
          gap: 24px;
        }
        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
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
        .label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #333;
        }
        .input {
          width: 100%;
          border: 1px solid #CCCCCC;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          color: #120A2B;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus {
          border-color: #3A0F7E;
        }
        .otp-input {
          text-align: center;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 0.3em;
        }
        .submit-btn {
          background-color: #3A0F7E;
          color: white;
          padding: 20px;
          border-radius: 16px;
          border: none;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s ease;
          box-shadow: 0 10px 15px -3px rgba(58, 15, 126, 0.2);
        }
        .verify-btn {
          background-color: #00D1FF;
          color: #120A2B;
          padding: 20px;
          border-radius: 16px;
          border: none;
          font-size: 18px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s ease;
        }
        .back-btn {
          background: none;
          border: none;
          color: #3A0F7E;
          font-size: 14px;
          font-weight: 700;
          margin-top: 24px;
          cursor: pointer;
        }
        .terms-hint {
          margin-top: 48px;
          text-align: center;
          font-size: 15px;
          color: #666;
        }
        .link {
          color: #3A0F7E;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .header {
            padding: 20px;
          }
          .form-card {
            padding: 40px 20px;
            border-radius: 24px;
          }
          .title {
            font-size: 28px;
          }
          .subtitle {
            font-size: 15px;
            margin-bottom: 32px;
          }
          .form-row {
            flex-direction: column;
            gap: 28px;
          }
          .submit-btn, .verify-btn {
            font-size: 16px;
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    border: '1px solid #CCCCCC',
    borderRadius: '12px',
    padding: '8px 4px',
    fontSize: '16px',
    boxShadow: state.isFocused ? '0 0 0 1px #3A0F7E' : 'none',
    '&:hover': {
      borderColor: '#999'
    }
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: '16px',
    backgroundColor: state.isSelected ? '#3A0F7E' : state.isFocused ? '#F0F0FF' : 'white',
    color: state.isSelected ? 'white' : '#120A2B',
  })
};
