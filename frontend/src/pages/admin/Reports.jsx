import { useEffect, useState } from "react";

import ExportButtons from "../../components/admin/reports/ExportButtons";
import SalesReport from "../../components/admin/reports/SalesReport";
import InventoryReport from "../../components/admin/reports/InventoryReport";
import OrderReport from "../../components/admin/reports/OrderReport";
import AuditReport from "../../components/admin/reports/AuditReport";

import {

    getSalesReport,

    getInventoryReport,

    getOrderReport,

    getAuditReport

} from "../../services/reportService";

const Reports = () => {

    const [activeTab, setActiveTab] = useState("sales");

    const [sales, setSales] = useState(null);

    const [inventory, setInventory] = useState([]);

    const [orders, setOrders] = useState([]);

    const [audit, setAudit] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadReports = async () => {

        try {

            setLoading(true);

            const [

                salesData,

                inventoryData,

                orderData,

                auditData

            ] = await Promise.all([

                getSalesReport(),

                getInventoryReport(),

                getOrderReport(),

                getAuditReport()

            ]);

            setSales(salesData);

            setInventory(inventoryData.products);

            setOrders(orderData.orders);

            setAudit(auditData.audits);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadReports();

    },[]);

    /*
    ----------------------------------------
    Export
    ----------------------------------------
    */

    const exportPDF=()=>{

        alert("PDF Export Coming Soon");

    };

    const exportExcel=()=>{

        alert("Excel Export Coming Soon");

    };

    const printReport=()=>{

        window.print();

    };

    if(loading){

        return(

            <div className="text-center py-20">

                Loading Reports...

            </div>

        );

    }

    return(

        <div className="space-y-6">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">

                    Reports

                </h1>

                <ExportButtons

                    onPDF={exportPDF}

                    onExcel={exportExcel}

                    onPrint={printReport}

                />

            </div>

            {/* Tabs */}

            <div className="flex gap-3">

                <button

                    onClick={()=>setActiveTab("sales")}

                    className={`px-5 py-2 rounded-lg ${
                        activeTab==="sales"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200"
                    }`}

                >

                    Sales

                </button>

                <button

                    onClick={()=>setActiveTab("inventory")}

                    className={`px-5 py-2 rounded-lg ${
                        activeTab==="inventory"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200"
                    }`}

                >

                    Inventory

                </button>

                <button

                    onClick={()=>setActiveTab("orders")}

                    className={`px-5 py-2 rounded-lg ${
                        activeTab==="orders"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200"
                    }`}

                >

                    Orders

                </button>

                <button

                    onClick={()=>setActiveTab("audit")}

                    className={`px-5 py-2 rounded-lg ${
                        activeTab==="audit"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200"
                    }`}

                >

                    Audit Logs

                </button>

            </div>

            {/* Content */}

            {

                activeTab==="sales" &&

                <SalesReport

                    report={sales}

                />

            }

            {

                activeTab==="inventory" &&

                <InventoryReport

                    products={inventory}

                />

            }

            {

                activeTab==="orders" &&

                <OrderReport

                    orders={orders}

                />

            }

            {

                activeTab==="audit" &&

                <AuditReport

                    logs={audit}

                />

            }

        </div>

    );

};

export default Reports;