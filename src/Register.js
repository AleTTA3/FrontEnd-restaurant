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

  const [error, setError] = useState('');
  const [successfull , setSuccess] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  const handleCheck = (e) => {
    e.preventDefault();
      const tb_name = document.getElementById("txt_name");
      const tb_phone = document.getElementById("txt_phone");
      const tb_address = document.getElementById("txt_address");
      const tb_email = document.getElementById("txt_email");
      const tb_password = document.getElementById("txt_password");
      const tb_repassword = document.getElementById("txt_repassword");
    // اعتبارسنجی فیلدهای ضروری
    if ( (mode === 'register' && (!formData.name || !formData.phone || !formData.address || !formData.password || !formData.email || !formData.confirmPassword))) {
      
      if ( (mode === 'register' && (!formData.name && !formData.phone && !formData.address && !formData.password && !formData.email && !formData.confirmPassword))) {
        setError('لطفاً همه فیلدهای ضروری را پر کنید');
        tb_name.style.border="2px solid red";
        tb_phone.style.border="2px solid red";
        tb_address.style.border="2px solid red";
        tb_email.style.border="2px solid red";
        tb_password.style.border="2px solid red";
        tb_repassword.style.border="2px solid red";
        
      }
      if (!formData.name){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (formData.name){
        tb_name.style.border="2px solid green";
        
      }
      if (!formData.phone){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (formData.phone){
        tb_phone.style.border="2px solid green";
        
      }
      if (!formData.address){
        tb_address.style.border="2px solid red";
        
      }
      else if (formData.address){
        tb_address.style.border="2px solid green";
        
      }
      if (!formData.email){
        tb_email.style.border="2px solid red";
        
      }
      else if (formData.email){
        tb_email.style.border="2px solid green";
        
      }
      if (!formData.password){
        tb_password.style.border="2px solid red";
        
      }
      else if (formData.password){
        tb_password.style.border="2px solid green";
        
      }
      if (!formData.confirmPassword){
        tb_repassword.style.border="2px solid red";
        
      }
      else if (formData.confirmPassword){
        tb_repassword.style.border="2px solid green";
        
      }
      
      
    }

    //شماره تلفن 
    if (!/^09\d{9}$/.test(formData.phone)) {
        
        tb_phone.style.border="2px solid red";
        setError('❌ شماره تماس معتبر نیست. باید با 09 شروع شود و 11 رقم باشد.');
        return;
      }
    if (/^09\d{9}$/.test(formData.phone)) {
      
      tb_phone.style.border="2px solid green";
      
    }
    // بررسی فرمت ایمیل
    if (!validateEmail(formData.email)) {
      setError('ایمیل وارد شده معتبر نیست.');
      return;
    }

    // بررسی یکسان بودن رمز عبور در حالت ثبت‌نام
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('پسورد و تکرار پسورد با هم یکی نیستند');
      return;
    }

    setError(''); // Reset error message
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      const tb_name = document.getElementById("txt_name");
      const tb_phone = document.getElementById("txt_phone");
      const tb_address = document.getElementById("txt_address");
      const tb_email = document.getElementById("txt_email");
      const tb_password = document.getElementById("txt_password");
      const tb_repassword = document.getElementById("txt_repassword");
    // اعتبارسنجی فیلدهای ضروری
    if ( (mode === 'register' && (!formData.name || !formData.phone || !formData.address || !formData.password || !formData.email || !formData.confirmPassword))) {
      
      if ( (mode === 'register' && (!formData.name && !formData.phone && !formData.address && !formData.password && !formData.email && !formData.confirmPassword))) {
        setError('لطفاً همه فیلدهای ضروری را پر کنید');
        tb_name.style.border="2px solid red";
        tb_phone.style.border="2px solid red";
        tb_address.style.border="2px solid red";
        tb_email.style.border="2px solid red";
        tb_password.style.border="2px solid red";
        tb_repassword.style.border="2px solid red";
        
      }
      if (!formData.name){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (formData.name){
        tb_name.style.border="2px solid green";
        
      }
      if (!formData.phone){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (formData.phone){
        tb_phone.style.border="2px solid green";
        
      }
      if (!formData.address){
        tb_address.style.border="2px solid red";
        
      }
      else if (formData.address){
        tb_address.style.border="2px solid green";
        
      }
      if (!formData.email){
        tb_email.style.border="2px solid red";
        
      }
      else if (formData.email){
        tb_email.style.border="2px solid green";
        
      }
      if (!formData.password){
        tb_password.style.border="2px solid red";
        
      }
      else if (formData.password){
        tb_password.style.border="2px solid green";
        
      }
      if (!formData.confirmPassword){
        tb_repassword.style.border="2px solid red";
        
      }
      else if (formData.confirmPassword){
        tb_repassword.style.border="2px solid green";
        
      }
      
      
    }

    //شماره تلفن 
    if (!/^09\d{9}$/.test(formData.phone)) {
        
        tb_phone.style.border="2px solid red";
        setError('❌ شماره تماس معتبر نیست. باید با 09 شروع شود و 11 رقم باشد.');
        return;
      }
    if (/^09\d{9}$/.test(formData.phone)) {
      
      tb_phone.style.border="2px solid green";
      return;
      
    }
    // بررسی فرمت ایمیل
    if (!validateEmail(formData.email)) {
      tb_email.style.border="2px solid red";
      setError('ایمیل وارد شده معتبر نیست.');
      return;
    }

    // بررسی یکسان بودن رمز عبور در حالت ثبت‌نام
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('پسورد و تکرار پسورد با هم یکی نیستند');
      return;
    }

    setError(''); // Reset error message

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
          setSuccess(mode === 'register' ? '✅ ثبت‌نام موفق بود' : '✅ ورود موفق بود');
        } else {
          setError(data.message);
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

      <form onSubmit={handleSubmit} onInput={handleCheck} className="auth-form animated-form">
        <h2 className="auth-title">{mode === 'register' ? 'فرم ثبت‌نام' : 'ورود به حساب'}</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successfull && <p style={{ color: 'green' }}>{successfull}</p>}

        {mode === 'register' && (
          <>
            <input type="text" name='txt_name' id='txt_name' placeholder="نام کامل" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" name='txt_phone' id='txt_phone' placeholder="شماره تماس" value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input type="text" name='txt_address'   id='txt_address' placeholder="آدرس" value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </>
        )}

        <input type="email" name='txt_email' id='txt_email' placeholder="ایمیل" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

        <input type="password" name='txt_password' id='txt_password' placeholder="رمز عبور" value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        {mode === 'register' && (
          <input type="password" name='txt_repassword' id='txt_repassword' placeholder="تایید رمز عبور" value={formData.confirmPassword}
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
