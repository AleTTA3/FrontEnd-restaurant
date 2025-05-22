import React, { useState, useEffect } from "react";
import "./FoodDetails.css";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faMinus, faPlus, faTrash , faUser} from "@fortawesome/free-solid-svg-icons";
import db from './db';
function FoodDetails({ addToCart, updateMenuItemQuantity, removeFromCart, cart }) {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(db.backend_location + "get_foods.php")
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => Number(item.id) === Number(id));
        setFood(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching food:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!food) return;
    fetch(`${db.backend_location}get_comments.php?food_id=${food.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setComments(data.comments);
      });
  }, [food]);

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
          setComments([{ name: 'شما', comment: newComment, created_at: new Date().toISOString() }, ...comments]);
          setNewComment('');
        }
      });
  };

  const cartItem = cart.find(item => Number(item.id) === Number(id));

  const formatPrice = (price) => {
    const numericPrice = parseInt(price.replace(/[^\d]/g, ""));
    return `${new Intl.NumberFormat("fa-IR").format(numericPrice)} تومان`;
  };

  if (loading) {
    return <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>در حال بارگذاری...</motion.h2>;
  }

  if (!food) {
    return <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>❌ غذا یافت نشد!</motion.h2>;
  }

  return (
  <motion.div className="food-details-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    {/* ستون چپ - اطلاعات غذا */}
    <div className="food-left">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-info">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <div className="food-footer">
          {cartItem ? (
            <div className="quantity-control">
                <button onClick={() => updateMenuItemQuantity(food.id, cartItem.quantity + 1)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span>{parseInt(cartItem.quantity).toLocaleString("fa-IR")}</span>
              <button onClick={() => updateMenuItemQuantity(food.id, cartItem.quantity - 1)}>
                <FontAwesomeIcon icon={cartItem.quantity > 1 ? faMinus : faTrash} />
              </button>
              
              
            </div>
          ) : (
            <button className="add-button" onClick={() => addToCart(food)}>افزودن</button>
          )}
          <p className="food-price">{formatPrice(food.price)}</p>
        </div>
      </div>
    </div>

    {/* ستون راست - نظرات */}
    <div className="food-right">
      <div className="comments-section">
        
        {userId && (
            
          <div className="comment-form">
            <h3>اگه قبلا اینو امتحان کردی نظرتو بگو بقیه استفاده کنن</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="نظر خود را بنویسید..."
              className="comment-textarea"
            ></textarea>
            <button onClick={handleAddComment} className="add-button mt-2">ارسال نظر</button>
          </div>
        )}
        {!userId && (
            <div className="comment-form">
            <button  className="add-button mt-2" ><Link to="/register" style={{textDecoration:  'none',color:'white'}}>ابتدا وارد شوید سپس ثبت نظر کنید </Link></button>
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
    </div>
  </motion.div>
);

}

export default FoodDetails;
