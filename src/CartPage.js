import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
function CartPage({ cart, removeFromCart, clearCart, updateMenuItemQuantity }) {
    const totalPrice = cart.reduce((sum, item) => {
        const price = parseInt(item.price.replace(/ تومان/g, "").replace(/,/g, ""));
        return sum + price * item.quantity; // محاسبه درست قیمت کل بر اساس quantity
    }, 0);

    const handleOrder = () => {
        if (cart.length === 0) {
            alert("سبد خرید شما خالی است");
            return;
        }
        alert(`✅ سفارش شما به مبلغ ${totalPrice.toLocaleString()} تومان ثبت شد. متشکریم! 🎉`);
        clearCart();
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
                <span >{parseInt(item.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>
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
