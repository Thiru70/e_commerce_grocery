import { useEffect, useState } from "react";

import ProductTable from "../../components/admin/products/ProductTable";
import ProductForm from "../../components/admin/products/ProductForm";
import SearchBar from "../../components/common/SearchBar";
import CategoryFilter from "../../components/products/CategoryFilter";
import Pagination from "../../components/products/Pagination";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../../services/productService";

import RefillModal
from "../../components/admin/inventory/RefillModal";

import {
    refillInventory
}
from "../../services/productService";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showRefillModal, setShowRefillModal] = useState(false);
    const [refillProduct, setRefillProduct] = useState(null);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const data = await getProducts(
                page,
                10,
                search,
                category
            );

            setProducts(data.products);
            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProducts();

    }, [page, search, category]);

    const handleSubmit = async (formData) => {

        try {

            if (editingProduct) {

                await updateProduct(
                    editingProduct._id,
                    formData
                );

                alert("Product Updated Successfully");

            } else {

                await addProduct(formData);

                alert("Product Added Successfully");

            }

            setEditingProduct(null);
            setShowForm(false);

            loadProducts();

        } catch (error) {

            console.error(error);

            alert("Operation Failed");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            alert("Product Deleted");

            loadProducts();

        } catch (error) {

            console.error(error);

        }

    };

    const handleRefill=async(data)=>{

    try{

        await refillInventory(

            selectedProduct._id,

            data

        );

        setShowRefill(false);

        loadProducts();

    }

    catch(error){

        console.log(error);

    }

};

    return (

        <div>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Product Management
                </h1>

                <button

                    onClick={() => {

                        setEditingProduct(null);

                        setShowForm(true);

                    }}

                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"

                >
                    + Add Product
                </button>

            </div>

            {showForm && (

                <div className="mb-8">

                    <ProductForm

                        product={editingProduct}

                        onSubmit={handleSubmit}

                        onCancel={() => {

                            setEditingProduct(null);

                            setShowForm(false);

                        }}

                    />

                </div>

            )}

            <div className="grid md:grid-cols-2 gap-4 mb-5">

                <SearchBar

                    search={search}

                    setSearch={setSearch}

                />

                <CategoryFilter

                    category={category}

                    setCategory={setCategory}

                />

            </div>

            {loading ? (

                <div className="text-center py-20 text-xl">

                    Loading Products...

                </div>

            ) : (

                <ProductTable

                    products={products}

                    onEdit={(product) => {

                        setEditingProduct(product);

                        setShowForm(true);

                    }}

                    onDelete={handleDelete}

                    onRefill={(product) => {

                        setSelectedProduct(product);

                        setShowRefill(true);

                    }}

                />

            )}

            <Pagination

                page={page}

                totalPages={totalPages}

                setPage={setPage}

            />

        </div>

    );

};

export default Products;