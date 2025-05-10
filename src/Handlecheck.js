
import Auth from "./Register";
function HandleCheck() {
const handleCheck = (e) => {
    e.preventDefault();
      const tb_name = document.getElementById("txt_name");
      const tb_phone = document.getElementById("txt_phone");
      const tb_address = document.getElementById("txt_address");
      const tb_email = document.getElementById("txt_email");
      const tb_password = document.getElementById("txt_password");
      const tb_repassword = document.getElementById("txt_repassword");
    // اعتبارسنجی فیلدهای ضروری
    if ( (Auth.mode === 'register' && (!Auth.formData.name || !Auth.formData.phone || !Auth.formData.address || !Auth.formData.password || !Auth.formData.email || !Auth.formData.confirmPassword))) {
      
      if ( (Auth.mode === 'register' && (!Auth.formData.name && !Auth.formData.phone && !Auth.formData.address && !Auth.formData.password && !Auth.formData.email && !Auth.formData.confirmPassword))) {
        Auth.setError('لطفاً همه فیلدهای ضروری را پر کنید');
        tb_name.style.border="2px solid red";
        tb_phone.style.border="2px solid red";
        tb_address.style.border="2px solid red";
        tb_email.style.border="2px solid red";
        tb_password.style.border="2px solid red";
        tb_repassword.style.border="2px solid red";
        
      }
      if (!Auth.formData.name){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (Auth.formData.name){
        tb_name.style.border="2px solid green";
        
      }
      if (!Auth.formData.phone){
        tb_name.style.border="2px solid red";
        
        
      }
      else if (Auth.formData.phone){
        tb_phone.style.border="2px solid green";
        
      }
      if (!Auth.formData.address){
        tb_address.style.border="2px solid red";
        
      }
      else if (Auth.formData.address){
        tb_address.style.border="2px solid green";
        
      }
      if (!Auth.formData.email){
        tb_email.style.border="2px solid red";
        
      }
      else if (Auth.formData.email){
        tb_email.style.border="2px solid green";
        
      }
      if (!Auth.formData.password){
        tb_password.style.border="2px solid red";
        
      }
      else if (Auth.formData.password){
        tb_password.style.border="2px solid green";
        
      }
      if (!Auth.formData.confirmPassword){
        tb_repassword.style.border="2px solid red";
        
      }
      else if (Auth.formData.confirmPassword){
        tb_repassword.style.border="2px solid green";
        
      }
      
      
    }

    //شماره تلفن 
    if (!/^09\d{9}$/.test(Auth.formData.phone)) {
        
        tb_phone.style.border="2px solid red";
        Auth.setError('❌ شماره تماس معتبر نیست. باید با 09 شروع شود و 11 رقم باشد.');
        return;
      }
    if (/^09\d{9}$/.test(Auth.formData.phone)) {
      
      tb_phone.style.border="2px solid green";
      
    }
    // بررسی فرمت ایمیل
    if (!Auth.validateEmail(Auth.formData.email)) {
      Auth.setError('ایمیل وارد شده معتبر نیست.');
      return;
    }

    // بررسی یکسان بودن رمز عبور در حالت ثبت‌نام
    if (Auth.mode === 'register' && Auth.formData.password !== Auth.formData.confirmPassword) {
      Auth.setError('پسورد و تکرار پسورد با هم یکی نیستند');
      return;
    }

    Auth.setError(''); // Reset error message

    const url = Auth.mode === 'register'
      ? 'http://localhost/restaurant/register.php'
      : 'http://localhost/restaurant/login.php';

    const payload = Auth.mode === 'register'
      ? {
          name: Auth.formData.name,
          email: Auth.formData.email,
          password: Auth.formData.password,
          phone: Auth.formData.phone,
          address: Auth.formData.address
        }
      : {
          email: Auth.formData.email,
          password: Auth.formData.password
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
          Auth.setSuccess(Auth.mode === 'register' ? '✅ ثبت‌نام موفق بود' : '✅ ورود موفق بود');
        } else {
          Auth.setError(data.message);
        }
      })
      .catch((error) => {
        alert('❌ خطای ارتباط با سرور');
        console.error(error);
      });
  };
}
export default HandleCheck;