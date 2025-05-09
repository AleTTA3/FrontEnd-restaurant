import React  from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Cart ({ cart , removeFromCart , clearCart }){
    const totalPrice = cart.reduce((sum,item)=>{
        // تبدیل قیمت به عدد (حذف " تومان" و جایگزینی , با "")
        const price = parseInt(item.price.replace(/ تومن/g, "").replace(/,/g, ""));
        return sum+price;
    }, 0);
    const handleOrder = () => {
        if (cart.length === 0){
            alert("سبد خرید شما خالی است");
            return;
        }
        alert(`سفارش شما به مبلغ ${totalPrice.toLocaleString()} تومان ثبت شد. متشکریم! 🎉`);
        clearCart();
    };
    return (
        <motion.div className="cart-container" initial={{ x: "100vw"}} animate={{ x: 0}} exit={{ x : "100vw"}} transition={{ type: "spring" , stiffness: 70}} >
            <h2>سبد خرید</h2>
            {cart.length === 0 ? (
                <p>سبد خرید شما خالی میباشد</p>
            ) : (
                <ul className="cart-list">
                    {cart.map((item, index) => (
                        <motion.li key={index} className="cart-item" whileHover={{ scale: 1.05}} whileTap={{ scale: 0.95}}>
                            <span>{item.name} - {item.price}</span>
                            <button className="remove-button" onClick={() => removeFromCart(index)}>حذف</button>
                        </motion.li>
                    ))}
                </ul>
                
            )} 
            <h3 className="total-price"> مجموع قیمت : {totalPrice.toLocaleString()} تومان </h3>
            <button className="order-button" onClick={handleOrder}> ثبت سفارش</button>
            <Link to="/" className="back-button">بازگشت به منو</Link>
        
        
        
        
        </motion.div>
    );
}
export default Cart;