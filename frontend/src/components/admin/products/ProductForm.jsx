import { useState, useEffect } from "react";
import { addProduct } from "../../../services/productService";

const ProductForm = ({ product = null, onSubmit, onCancel }) => {

    const [formData, setFormData] = useState({

        name: "",

        description: "",

        category: "Vegetables",

        price: "",

        oldPrice: "",

        stock: "",

        weight: "",

        rating: 5,

        image: null,

        preview: "",

        lockEnabled: true,

        lockDuration: 7

    });

    useEffect(() => {

        if (product) {

            setFormData({

                ...product,

                preview: product.image

            });

        }

    }, [product]);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        }));

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({

            ...prev,

            image: file,

            preview: URL.createObjectURL(file)

        }));

    };

    const submitForm = (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            if (key !== "preview") {

                data.append(key, formData[key]);

            }

        });

        onSubmit(data);

    };

    return (

        <form
            onSubmit={submitForm}
            className="bg-white rounded-xl shadow p-6"
        >

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Image */}

                <div>

                    <div className="border rounded-xl h-72 flex items-center justify-center overflow-hidden">

                        {formData.preview ? (

                            <img

                                src={formData.preview}

                                alt="Preview"

                                className="w-full h-full object-cover"

                            />

                        ) : (

                            <span className="text-gray-400">

                                No Image

                            </span>

                        )}

                    </div>

                    <input

                        type="file"

                        accept="image/*"

                        onChange={handleImage}

                        className="mt-4"

                    />

                </div>

                {/* Form */}

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-5">

                    <input

                        name="name"

                        placeholder="Product Name"

                        value={formData.name}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                        required

                    />

                    <select

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    >

                        <option>Vegetables</option>

                        <option>Fruits</option>

                        <option>Dairy</option>

                        <option>Bakery</option>

                        <option>Beverages</option>

                    </select>

                    <input

                        name="price"

                        type="number"

                        placeholder="Price"

                        value={formData.price}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <input

                        name="oldPrice"

                        type="number"

                        placeholder="Old Price"

                        value={formData.oldPrice}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <input

                        name="stock"

                        type="number"

                        placeholder="Stock"

                        value={formData.stock}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <input

                        name="weight"

                        placeholder="Weight"

                        value={formData.weight}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <input

                        name="rating"

                        type="number"

                        min="1"

                        max="5"

                        step="0.1"

                        value={formData.rating}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <input

                        name="lockDuration"

                        type="number"

                        value={formData.lockDuration}

                        onChange={handleChange}

                        className="border rounded-lg px-4 py-3"

                    />

                    <textarea

                        name="description"

                        placeholder="Description"

                        value={formData.description}

                        onChange={handleChange}

                        rows="5"

                        className="border rounded-lg px-4 py-3 md:col-span-2"

                    />

                    <label className="flex items-center gap-3 md:col-span-2">

                        <input

                            type="checkbox"

                            name="lockEnabled"

                            checked={formData.lockEnabled}

                            onChange={handleChange}

                        />

                        Enable Intelligent Atomic Locking

                    </label>

                </div>

            </div>

            <div className="flex justify-end gap-4 mt-8">

                <button

                    type="button"

                    onClick={onCancel}

                    className="px-6 py-3 rounded-lg border"

                >

                    Cancel

                </button>

                <button

                    type="submit"

                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"

                >

                    {product ? "Update Product" : "Add Product"}

                </button>

            </div>

        </form>

    );

};

export default ProductForm;