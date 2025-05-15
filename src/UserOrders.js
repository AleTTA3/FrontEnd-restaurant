import React, { useEffect, useState } from 'react';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setError('لطفاً ابتدا وارد حساب کاربری شوید.');
      setLoading(false);
      return;
    }

    let userId;
    try {
      const user = JSON.parse(storedUser);
      userId = user.id;
    } catch (e) {
      setError('اطلاعات کاربر نامعتبر است.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost/restaurant/get_user_orders.php?userId=${userId}`)
      .then(res => res.json())
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
  }, []);

  if (loading) return <p>در حال بارگذاری سفارش‌ها...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="orders-container">
      <h2>سفارش‌های من</h2>
      {orders.length === 0 ? (
        <p>سفارشی ثبت نشده است.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p><strong>کد سفارش:</strong> {order.id}</p>
              <p><strong>تاریخ:</strong> {order.created_at || order.date}</p>
              <p><strong>وضعیت:</strong> {order.status || 'نامشخص'}</p>
              <p><strong>جمع کل:</strong> {order.total_price} تومان</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserOrders;
