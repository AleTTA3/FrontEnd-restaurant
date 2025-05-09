import "./Menu.css";
import { useState, useEffect } from "react";
import * as framer from "framer-motion";
const motion = framer.motion;

// لیست آیتم‌های منو
const menuItems = [
    { id: 1, name: "پیتزا مخصوص", price: "150,000 تومان" },
    { id: 2, name: "همبرگر کلاسیک", price: "120,000 تومان" },
    { id: 3, name: "پاستا آلفردو", price: "120,000 تومان" },
];

function Menu({ addToCart }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filteredItems, setFilteredItems] = useState(menuItems);

    // جستجو و مرتب‌سازی را هم‌زمان مدیریت می‌کند
    useEffect(() => {
        let updatedItems = menuItems.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortOption === "priceLow") {
            updatedItems.sort((a, b) => parseInt(a.price.replace(",", "").replace(" تومان", "")) - parseInt(b.price.replace(",", "").replace(" تومان", "")));
        } else if (sortOption === "priceHigh") {
            updatedItems.sort((a, b) => parseInt(b.price.replace(",", "").replace(" تومان", "")) - parseInt(a.price.replace(",", "").replace(" تومان", "")));
        }
        console.log("Filtered Items: ", updatedItems);
        setFilteredItems(updatedItems);
    }, [searchQuery, sortOption]);

    return (
        <div className="menu-container">
            {/* فیلد جستجو و دراپ‌داون مرتب‌سازی */}
            <div className="search-sort-container">
                <input
                    type="text"
                    placeholder="جستجو..."
                    value={searchQuery}
                    onChange={(e) => console.log("Search Query:", searchQuery)}
                    className="search-box"
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-dropdown"
                >
                    <option value="">مرتب‌سازی بر اساس</option>
                    <option value="priceLow">قیمت: کم به زیاد</option>
                    <option value="priceHigh">قیمت: زیاد به کم</option>
                </select>
            </div>

            {/* لیست غذاها */}
            <motion.ul
                className="menu-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {filteredItems.map((item) => (
                    <motion.li
                        key={item.id}
                        className="menu-item"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{item.name} - {item.price}</span>
                        <button className="add-button" onClick={() => addToCart(item)}>
                            افزودن به سبد خرید
                        </button>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

export default Menu;
