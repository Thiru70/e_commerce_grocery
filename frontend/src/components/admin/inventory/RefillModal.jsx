import { useState } from "react";

const RefillModal = ({
    product,
    onClose,
    onSubmit
}) => {

    const [quantity, setQuantity] = useState("");

    const [reason, setReason] = useState("");

    const submit = (e) => {

        e.preventDefault();

        onSubmit({

            quantity: Number(quantity),

            reason

        });

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl p-8 w-[450px]">

                <h2 className="text-2xl font-bold mb-6">

                    Refill Inventory

                </h2>

                <div className="mb-5">

                    <p className="font-semibold">

                        {product.name}

                    </p>

                    <p>

                        Current Stock :

                        <span className="font-bold">

                            {" "}
                            {product.stock}

                        </span>

                    </p>

                </div>

                <form onSubmit={submit}>

                    <input

                        type="number"

                        placeholder="Quantity"

                        value={quantity}

                        onChange={(e)=>setQuantity(e.target.value)}

                        className="border rounded-lg px-4 py-3 w-full mb-4"

                        required

                    />

                    <textarea

                        placeholder="Reason"

                        value={reason}

                        onChange={(e)=>setReason(e.target.value)}

                        className="border rounded-lg px-4 py-3 w-full mb-5"

                        rows="4"

                        required

                    />

                    <div className="flex justify-end gap-3">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-5 py-3 border rounded-lg"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                        >

                            Refill Stock

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default RefillModal;