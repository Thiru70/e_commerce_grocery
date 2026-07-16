import { useEffect, useState } from "react";

const Countdown = ({ expiresAt }) => {

    const calculate = () => {

        const diff =

            new Date(expiresAt) - new Date();

        if (diff <= 0)

            return "Expired";

        const minutes =

            Math.floor(diff / 60000);

        const seconds =

            Math.floor((diff % 60000) / 1000);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(calculate());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <span className="font-semibold text-orange-600">

            {time}

        </span>

    );

};

export default Countdown;