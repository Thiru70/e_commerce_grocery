const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
