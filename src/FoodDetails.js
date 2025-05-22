import React, { useState, useEffect } from "react";
import "./FoodDetails.css";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import db from './db';
function FoodDetails({ addToCart, updateMenuItemQuantity, removeFromCart, cart }) {
    const { id } = useParams();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        fetch(db.backend_location+"get_foods.php")
            .then((response) => response.json())
            .then((data) => {
                setFood(data.find(item => Number(item.id) === Number(id)));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [id]);
    useEffect(() => {
  if (!food) return; // 👈 اگر هنوز food لود نشده، هیچی اجرا نکن

  fetch(db.backend_location + `get_comments.php?food_id=${food.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) setComments(data.comments);
    });
}, [food]); // 👈 حالا فقط زمانی اجرا می‌شه که food مقدار بگیره


const handleAddComment = () => {
  if (!newComment.trim()) return;

  fetch(db.backend_location + 'add_comment.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      food_id: food.id,
      user_id: userId,
      comment: newComment
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setComments([{ username: 'شما', comment: newComment, created_at: new Date().toISOString() }, ...comments]);
        setNewComment('');
      }
    });
};

    if (loading) {
        return <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>در حال بارگذاری...</motion.h2>;
    }

    if (!food) {
        return (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                ❌ غذا یافت نشد!
            </motion.h2>
        );
    }

    const cartItem = cart.find(item => Number(item.id) === Number(id));


    const formatPrice = (price) => {
        const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));
        return `${new Intl.NumberFormat("fa-IR").format(numericPrice)} تومان`;
    };

    return (
  <motion.div className="food-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <img src={food.image} alt={food.name} className="food-image" />

    <div className="food-info">
      <h2>{food.name}</h2>
      <p>{food.description}</p>

      <div className="food-footer">
        {cartItem ? (
          <div className="quantity-controll">
            <button 
              onClick={() => updateMenuItemQuantity(food.id, cartItem.quantity - 1)}
            >
              <FontAwesomeIcon icon={cartItem.quantity > 1 ? faMinus : faTrash} />
            </button>

            <span>{parseInt(cartItem.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>

            <button 
              onClick={() => updateMenuItemQuantity(food.id, cartItem.quantity + 1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        ) : (
          <button className="add-button" onClick={() => addToCart(food)}>افزودن</button>
        )}
        <p className="text-green-600 font-semibold">{formatPrice(food.price)}</p>
      </div>
    </div>

    {/* ====== بخش نظرات کاربران ====== */}
    <div className="comments-section">
      <h3>نظرات کاربران</h3>

      {userId && (
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="comment-textarea"
          ></textarea>
          <button onClick={handleAddComment} className="add-button mt-2">ارسال نظر</button>
        </div>
      )}

      {comments.length === 0 ? (
        <p className="no-comments">هنوز نظری ثبت نشده است.</p>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="comment-box">
            <strong>{c.name}</strong>
            <p>{c.comment}</p>
            <small>{new Date(c.created_at).toLocaleString("fa-IR")}</small>
          </div>
        ))
      )}
    </div>
  </motion.div>
);

}

export default FoodDetails;
