const CategoryFilter = ({ category, setCategory }) => {

    return (

        <select

            value={category}

            onChange={(e) => setCategory(e.target.value)}

            className="border rounded-lg px-4 py-3"

        >

            <option value="">All Categories</option>

            <option value="Vegetables">Vegetables</option>

            <option value="Fruits">Fruits</option>

            <option value="Dairy">Dairy</option>

            <option value="Bakery">Bakery</option>

            <option value="Beverages">Beverages</option>

        </select>

    );

};

export default CategoryFilter;