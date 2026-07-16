const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p>Order ID: {order._id}</p>
        <button onClick={onClose} className="mt-4 bg-gray-200 px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};
export default OrderDetailModal;
