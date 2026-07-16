const SearchBar = ({ search, setSearch }) => {

    return (

        <input

            type="text"

            placeholder="Search Product..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="border rounded-lg px-4 py-3 w-full"

        />

    );

};

export default SearchBar;