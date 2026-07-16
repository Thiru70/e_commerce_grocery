const Pagination = ({
    page,
    totalPages,
    setPage,
}) => {

    return (

        <div className="flex justify-center gap-3 mt-8">

            <button

                disabled={page === 1}

                onClick={() => setPage(page - 1)}

                className="px-4 py-2 bg-gray-300 rounded"

            >

                Previous

            </button>

            <span className="px-4 py-2">

                {page} / {totalPages}

            </span>

            <button

                disabled={page === totalPages}

                onClick={() => setPage(page + 1)}

                className="px-4 py-2 bg-emerald-600 text-white rounded"

            >

                Next

            </button>

        </div>

    );

};

export default Pagination;