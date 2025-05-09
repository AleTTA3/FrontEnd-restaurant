import React, { useState } from 'react';
import './Auth.css';

function Auth() {
  const [mode, setMode] = useState('register'); // 'login' یا 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // بررسی یکسان بودن رمز عبور در حالت ثبت‌نام
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      alert('رمز عبورها یکسان نیستند');
      return;
    }

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(mode === 'register' ? '✅ ثبت‌نام موفق بود' : '✅ ورود موفق بود');
        } else {
          alert('❌ خطا: ' + data.message);
        }
      })
      .catch((error) => {
        alert('❌ خطای ارتباط با سرور');
        console.error(error);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>ورود</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>ثبت‌نام</button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form animated-form">
        <h2 className="auth-title">{mode === 'register' ? 'فرم ثبت‌نام' : 'ورود به حساب'}</h2>

        {mode === 'register' && (
          <>
            <input type="text" placeholder="نام کامل" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" placeholder="شماره تماس" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input type="text" placeholder="آدرس" value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </>
        )}

        <input type="email" placeholder="ایمیل" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

        <input type="password" placeholder="رمز عبور" value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        {mode === 'register' && (
          <input type="password" placeholder="تایید رمز عبور" value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
        )}

        <button type="submit" className="auth-button">
          {mode === 'register' ? 'ثبت‌نام' : 'ورود'}
        </button>
      </form>
    </div>
  );
}

export default Auth;
