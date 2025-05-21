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

    console.log("Cart State:", cart);
    console.log("Current Food:", food);
    console.log("Cart Item:", cartItem);

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
            
            <span >{parseInt(cartItem.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>
            
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
        </motion.div>
    );
}

export default FoodDetails;
