const StatusBadge = ({ status }) => {

    const colors = {

        Pending:
            "bg-yellow-100 text-yellow-700",

        Confirmed:
            "bg-blue-100 text-blue-700",

        Packed:
            "bg-indigo-100 text-indigo-700",

        "Out For Delivery":
            "bg-orange-100 text-orange-700",

        Delivered:
            "bg-green-100 text-green-700",

        Cancelled:
            "bg-red-100 text-red-700"

    };

    return (

        <span

            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}

        >

            {status}

        </span>

    );

};

export default StatusBadge;