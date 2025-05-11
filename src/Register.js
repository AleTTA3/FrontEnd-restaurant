import React, { useState } from 'react';
import './Auth.css';

function Auth() {
  const [mode, setMode] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  }); 
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const validatePhone = (phone) => /^09\d{9}$/.test(phone);
  const validateForm = () => {
    const newErrors = {};
    if (mode === 'register') {
      if (!formData.name) newErrors.name = 'نام را وارد کنید';
      if (!formData.phone) newErrors.phone = 'شماره تماس را وارد کنید';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'شماره تماس معتبر نیست';
      if (!formData.address) newErrors.address = 'آدرس را وارد کنید';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'تکرار رمز عبور را وارد کنید';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیست';
    }
    if (!formData.email) newErrors.email = 'ایمیل را وارد کنید';
    else if (!validateEmail(formData.email)) newErrors.email = 'ایمیل معتبر نیست';
    if (!formData.password) newErrors.password = 'رمز عبور را وارد کنید';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  let error = '';

  switch (field) {
    case 'name':
      if (mode === 'register' && !value.trim()) error = 'نام را وارد کنید';
      break;
    case 'email':
      if (!value.trim()) error = 'ایمیل را وارد کنید';
      else if (!validateEmail(value)) error = 'ایمیل معتبر نیست';
      break;
    case 'phone':
      if (mode === 'register') {
        if (!value.trim()) error = 'شماره تماس را وارد کنید';
        else if (!validatePhone(value)) error = 'شماره تماس باید ۱۱ رقم باشد و با 09 شروع شود';
      }
      break;
    case 'address':
      if (mode === 'register' && !value.trim()) error = 'آدرس را وارد کنید';
      break;
    case 'password':
      if (!value.trim()) error = 'رمز عبور را وارد کنید';
      break;
    case 'confirmPassword':
      if (mode === 'register') {
        if (!value.trim()) error = 'تکرار رمز عبور را وارد کنید';
        else if (value !== formData.password) error = 'رمز عبور و تکرار آن یکسان نیست';
      }
      break;
  }

  setErrors(prev => ({ ...prev, [field]: error }));
  setFormMessage('');
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = mode === 'register'
      ? 'http://localhost/restaurant/register.php'
      : 'http://localhost/restaurant/login.php';

    const payload = mode === 'register'
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address
        }
      : {
          email: formData.email,
          password: formData.password
        };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFormMessage(' عملیات با موفقیت انجام شد');
          setErrors({});
        } else {
          setFormMessage(` ${data.message}`);
        }
      })
      .catch(() => setFormMessage(' خطا در ارتباط با سرور'));
  };

  const getInputClass = (field) => {
    if (errors[field]) return 'input-error';
    if (formData[field]) return 'input-success';
    return '';
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>ورود</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>ثبت‌نام</button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form animated-form">
        <h2 className="auth-title">{mode === 'register' ? ' ' : 'ورود به حساب'}</h2>

        {formMessage && <div className={`form-message ${formMessage.startsWith('') ? 'success' : 'error'}`}>{formMessage}</div>}

        {mode === 'register' && (
          <>
            <input type="text" placeholder="نام کامل"
              className={getInputClass('name')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)} />

            <input type="text" placeholder="شماره تماس"
              className={getInputClass('phone')}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)} />

            <input type="text" placeholder="آدرس"
              className={getInputClass('address')}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)} />
          </>
        )}

        <input type="email" placeholder="ایمیل"
          className={getInputClass('email')}
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)} />

        <input type="password" placeholder="رمز عبور"
          className={getInputClass('password')}
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)} />

        {mode === 'register' && (
          <input type="password" placeholder="تکرار رمز عبور"
            className={getInputClass('confirmPassword')}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)} />
        )}

        <button type="submit" className="auth-button">
          {mode === 'register' ? 'ثبت‌نام' : 'ورود'}
        </button>
      </form>
    </div>
  );
}

export default Auth;
