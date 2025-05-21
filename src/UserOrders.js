import React, { useEffect, useState } from 'react';
import './UserOrders.css'; // اطمینان حاصل کنید که فایل CSS را ایجاد کرده‌اید
import moment from 'moment-jalaali';
import db from './db';
function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  function toPersianDigits(str) {
  return str.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    if (!userId) {
      setError('لطفاً ابتدا وارد حساب کاربری شوید');
      setLoading(false);
    }

    fetch(db.backend_location+`get_user_orders.php?userId=${userId}`)
    
      .then(res => {
        if (!res.ok) {
          throw new Error('خطا در دریافت سفارش‌ها از سرور');
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || 'خطا در دریافت سفارش‌ها');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('ارتباط با سرور برقرار نشد.');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>در حال بارگذاری سفارش‌ها...</p>;
  if (error) return <p style={{ color: 'red' }}><div className="orders-container"> <h2>{error}</h2></div> </p>;
  return (
    <div className="orders-container">
      <h2>سفارش‌های من</h2>
      {orders.length === 0 ? (
        <p>سفارشی ثبت نشده است.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <span>کد سفارش: {order.id}</span>
              <span><strong>تاریخ:</strong> {toPersianDigits(moment(order.created_at).format('jYYYY/jMM/jDD HH:mm'))}</span>
              <span>وضعیت: {order.status}</span>
            </div>
            <div className="order-items">
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.food_name} × {parseInt(item.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")} = {parseInt(item.price * item.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")} تومان
                    
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-total">
              جمع کل: {parseInt(order.total_price.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")} تومان
              
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;
