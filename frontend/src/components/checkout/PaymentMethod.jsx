import { useState } from "react";

const PaymentMethod = () => {

  const [payment, setPayment] = useState("COD");

  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "COD"}
            onChange={() => setPayment("COD")}
          />
          Cash on Delivery
        </label>

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "UPI"}
            onChange={() => setPayment("UPI")}
          />
          UPI
        </label>

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "CARD"}
            onChange={() => setPayment("CARD")}
          />
          Credit / Debit Card
        </label>

      </div>

    </div>

  );

};

export default PaymentMethod;