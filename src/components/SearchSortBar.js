import React from "react";
const SearchSortBar = ({ onSearch ,  onSort}) => {
    const [searchText , setSearchText] = useState("");
    const [sortOption , setSortOption] = useState("");
}
const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSort(e.target.value);
};
const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
};

return (
    <div className="search-sort-container">
        <input type="text" placeholder="جست و جو...." value={searchText} onChange={handleSearchChange} className="search-box"/>
        <select value={sortOption} onChange={handleSearchChange} className="sort-dropdown">
            <option value=""> مرتب سازی بر اساس</option>
            <option value="priceLow">قیمت کم به زیاد </option>
            <option value="priceHigh"> قیمت زیاد به کم</option>
            <option value="popular"> محبوب ترین </option>

        </select>    
    </div>
    
);
export default SearchSortBar;
