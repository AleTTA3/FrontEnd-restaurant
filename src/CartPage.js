import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import db from './db';
function CartPage({ cart, removeFromCart, clearCart, updateMenuItemQuantity }) {
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/ تومان/g, "").replace(/,/g, ""));
        return sum + price * item.quantity; 
    }, 0);

    const handleOrder = async () => {
    if (cart.length === 0) {
        alert("سبد خرید شما خالی است");
        return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert("ابتدا وارد حساب کاربری شوید");
        return;
    }

    const orderData = {
        userId: parseInt(userId),  // 👈 بسیار مهم: عددی باشه
        total_price: totalPrice,
        items: cart.map(item => ({
            food_id: item.id,
            quantity: item.quantity,
            price: parseInt(item.price.replace(/ تومان/g, "").replace(/,/g, ""))
        }))
    };

    try {
        const response = await fetch(db.backend_location+'cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        if (data.success) {
            alert("سفارش با موفقیت ثبت شد.");
            clearCart();
        } else {
            console.error('Failed to place order');
            alert("خطا در ثبت سفارش");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("خطای شبکه در ثبت سفارش");
    }
};

    

    return (
        <div className="cart-container">
            <h2>سبد خرید</h2>
            {cart.length === 0 ? (
                <p>سبد خرید شما خالی است.</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item, index) => (
                        <li key={item.id} className="cart-item">
                            <span>{item.name} - {parseInt(item.price.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>
                            <div className="item-actions">
                                <div className="quantity-controll">
                                    <button 
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                updateMenuItemQuantity(item.id, item.quantity - 1);
                                            } else {
                                                removeFromCart(item.id);
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.quantity > 1 ? faMinus : faTrash} />
                                    </button>
                                    <span>{parseInt(item.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>
                                    <button onClick={() => updateMenuItemQuantity(item.id, item.quantity + 1)}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <>
                    <h3>مجموع: {parseInt(totalPrice.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")} تومان</h3>
                    <button className="clear-cart" onClick={clearCart}>پاک کردن سبد خرید</button>
                    <div className="block"></div>
                    <button className="order-button" onClick={handleOrder}>ثبت سفارش</button>
                </>
            )}
        </div>
    );
}

export default CartPage;
