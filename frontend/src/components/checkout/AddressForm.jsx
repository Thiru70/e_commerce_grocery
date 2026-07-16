const AddressForm = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Delivery Address
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          placeholder="Full Name"
          className="border rounded-lg p-3"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="border rounded-lg p-3"
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-3 md:col-span-2"
        />

        <textarea
          placeholder="Address"
          className="border rounded-lg p-3 md:col-span-2"
          rows="4"
        />

        <input
          type="text"
          placeholder="City"
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="State"
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Pincode"
          className="border rounded-lg p-3"
        />

      </div>

    </div>
  );
};

export default AddressForm;