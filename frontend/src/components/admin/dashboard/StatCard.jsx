const StatCard = ({ title, value, color }) => {

    return (

        <div className={`${color} rounded-xl shadow p-6`}>

            <h3 className="text-gray-700 font-semibold">

                {title}

            </h3>

            <h2 className="text-3xl font-bold mt-3">

                {value}

            </h2>

        </div>

    );

};

export default StatCard;