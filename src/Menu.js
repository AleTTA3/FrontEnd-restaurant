import React, { useState , useEffect } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";
import * as framer from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { faMinus, faPlus, faTrash , faSearch } from "@fortawesome/free-solid-svg-icons";
import db from "./db";
const motion = framer.motion;

const categories = [
    "همه", "صبحانه", "سالاد", "پیتزا", "برگر", "ساندویچ", "نوشیدنی", "چای و قلیون",
];

function Menu({ addToCart, cart, updateMenuItemQuantity, removeFromCart }) {
    const [menuItems, setMenuItems] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("همه");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const toggleSearch = () => setShowSearch(prev => !prev);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const toggleSearchBox = () => setIsSearchOpen(!isSearchOpen);
    const [searchText, setSearchText] = useState("");

   
  useEffect(() => {
    
    fetch(db.backend_location+"get_foods.php")
        .then(response => response.json())
        .then(data => {
            setMenuItems(data); 
            setFilteredItems(data); 
        })
        .catch(error => console.error("Error fetching menu items:", error));
}, []);

 
  const handleSearch = (query) => {
    setSearchQuery(query);
    let updatedItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (selectedCategory !== "همه") {
        updatedItems = updatedItems.filter(item => item.category === selectedCategory);
    }
    setFilteredItems(updatedItems);
};
  

  const handleSort = (option) => {
      setSortOption(option);
      let sortedItems = [...filteredItems];
      if (option === "priceLow") {
          sortedItems.sort((a, b) =>
              parseInt(a.price.replace(",", "").replace(" تومان", "")) - 
              parseInt(b.price.replace(",", "").replace(" تومان", ""))
          );
      } else if (option === "priceHigh") {
          sortedItems.sort((a, b) =>
              parseInt(b.price.replace(",", "").replace(" تومان", "")) - 
              parseInt(a.price.replace(",", "").replace(" تومان", ""))
          );
      }
      setFilteredItems(sortedItems);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "همه") {
        setFilteredItems(menuItems);
    } else {
        setFilteredItems(menuItems.filter(item => item.category === category));
    }
};


  return (
      <div className="menu-container">
          {}
          <div className="sidebar">
              <h3>دسته‌بندی‌ها</h3>
              <ul>
                  {categories.map((category) => (
                      <li
                          key={category}
                          className={selectedCategory === category ? "active" : ""}
                          onClick={() => handleCategoryClick(category)}
                      >
                          {category}
                      </li>
                  ))}
              </ul>
          </div>


          <div className="menu-content">
          <div className="search-sort-container">


          <div className="dropdown-container">
        <button
          className="dropdown-button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} />
          <span>مرتب‌سازی</span>
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div onClick={() => handleSort('priceLow')}>قیمت: کم به زیاد</div>
            <div onClick={() => handleSort('priceHigh')}>قیمت: زیاد به کم</div>
          </div>
        )}
      </div>
        <div class="search-box">
            <input type="text" placeholder="به چی میل داری؟" class="search-txt" onChange={(e) => handleSearch(e.target.value)} /> 
                <a href="#" class="search-btn"><FontAwesomeIcon icon={faSearch} className="search-icon" /> </a> 
        </div>

    
    </div>

              <motion.ul className="menu-grid"> 

                
                  {filteredItems.map((item) => {
                      const cartItem = cart.find(cartItem => cartItem.id === item.id);
                      
                      return (
                          <motion.li key={item.id} className="menu-card">
                              <img src={item.image} alt={item.name} className="food-image" />
                              <div className="food-description">
                                  <Link to={`/food-details/${item.id}`} className="link-decoration">
                                      <h3>{item.name}</h3>
                                  </Link> 
                                  <p>{item.description}</p>
                              </div>
                              <div className="food-footer">
                                  {cartItem ? (
                                    <div className="quantity-controll">
                                        <button 
                                            onClick={() => {
                                                if (cartItem.quantity > 1) {
                                                    updateMenuItemQuantity(item.id, cartItem.quantity - 1);
                                                } else {
                                                    removeFromCart(item.id);
                                                }
                                            }}
                                        > 
                                        <FontAwesomeIcon icon={cartItem.quantity > 1 ? faMinus : faTrash} />
                                        </button>
                                        <span >{parseInt(cartItem.quantity.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")}</span>
                                        <button onClick={() => updateMenuItemQuantity(item.id, cartItem.quantity + 1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    ) : (
                                      <button className="add-button" onClick={() => addToCart(item)}>
                                          افزودن
                                      </button>
                                  )}
                                  <p className="text-green-600 font-semibold">{parseInt(item.price.toString().replace(/[^0-9]/g, "")).toLocaleString("fa-IR")} تومان </p>
                              </div>
                          </motion.li>
                      );
                  })}
              </motion.ul>
          </div>
      </div>
  );
}


export default Menu;
