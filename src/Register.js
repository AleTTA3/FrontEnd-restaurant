import React, { useState, useEffect } from 'react';
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
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی‌ها
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setMessage('❌ رمز عبور و تکرار آن یکسان نیست.');
        return;
      }
      if (!/^09\d{9}$/.test(formData.phone)) {
        setMessage('❌ شماره تماس معتبر نیست. باید با 09 شروع شود و 11 رقم باشد.');
        return;
      }
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

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setMessage(`✅ خوش آمدی ${data.user.name}!`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ خطای ارتباط با سرور');
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMessage('✅ با موفقیت خارج شدید.');
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="welcome-box">
          <h2>سلام {user.name} 👋</h2>
          <p>شما وارد شده‌اید با ایمیل: {user.email}</p>
          <button onClick={handleLogout}>🚪 خروج</button>
        </div>
      ) : (
        <>
          <div className="auth-tabs">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>ورود</button>
            <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>ثبت‌نام</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form animated-form">
            <h2 className="auth-title">{mode === 'register' ? 'فرم ثبت‌نام' : 'ورود به حساب'}</h2>

            {message && <div className="form-message">{message}</div>}

            {mode === 'register' && (
              <>
                <input type="text" name='txt_name' placeholder="نام کامل" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="text" name='txt_phone' placeholder="شماره تماس" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input type="text" name='txt_address' placeholder="آدرس" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </>
            )}
            <input type="email" name='txt_email' placeholder="ایمیل" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

            <input type="password" name='txt_password' placeholder="رمز عبور" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

            {mode === 'register' && (
              <input type="password" name='txt_repassword' placeholder="تایید رمز عبور" value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            )}

            <button type="submit" className="auth-button">
              {mode === 'register' ? 'ثبت‌نام' : 'ورود'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Auth;
