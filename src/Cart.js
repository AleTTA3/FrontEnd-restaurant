import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
    return (
        <div className="cart-container">
            <h2>سبد خرید</h2>
            {cart.length === 0 ? (
                <p>سبد خرید شما خالی است</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>{item.price}</p>
                            </div>
                            <div className="cart-quantity">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <FontAwesomeIcon icon={item.quantity > 1 ? faMinus : faTrash} />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <button className="clear-cart" onClick={clearCart}>
                    پاک کردن سبد خرید
                </button>
            )}
        </div>
    );
}

export default Cart;
