import { useState, useEffect, useCallback } from "react";

import StatCard from "../../components/admin/dashboard/StatCard";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import OrdersChart from "../../components/admin/dashboard/OrderChart";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import LowStockTable from "../../components/admin/dashboard/LowStockTable";
import ActiveLocksTable from "../../components/admin/dashboard/ActiveLocksTable";

import { getDashboard } from "../../services/adminService";
import socket from "../../socket/socket";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            const data = await getDashboard();

            setDashboard(data);

            setError("");

        }

        catch (err) {

            console.error(err);

            setError("Failed to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    useEffect(() => {

        socket.on("dashboardRefresh", loadDashboard);

        socket.on("inventoryChanged", loadDashboard);

        socket.on("newOrder", loadDashboard);

        socket.on("lockCreated", loadDashboard);

        socket.on("lockExpired", loadDashboard);

        return () => {

            socket.off("dashboardRefresh", loadDashboard);

            socket.off("inventoryChanged", loadDashboard);

            socket.off("newOrder", loadDashboard);

            socket.off("lockCreated", loadDashboard);

            socket.off("lockExpired", loadDashboard);

        };

    }, [loadDashboard]);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <div className="text-2xl font-semibold">

                    Loading Dashboard...

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="text-center mt-10">

                <h2 className="text-red-600 text-xl">

                    {error}

                </h2>

            </div>

        );

    }

    const stats = dashboard?.statistics || {};

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            {/* KPI Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                <StatCard
                    title="Today's Revenue"
                    value={`₹${stats.revenueToday || 0}`}
                    color="bg-green-500"
                />

                <StatCard
                    title="Today's Orders"
                    value={stats.ordersToday || 0}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Customers"
                    value={stats.customers || 0}
                    color="bg-purple-500"
                />

                <StatCard
                    title="Products"
                    value={stats.products || 0}
                    color="bg-orange-500"
                />

                <StatCard
                    title="Low Stock"
                    value={stats.lowStock || 0}
                    color="bg-red-500"
                />

                <StatCard
                    title="Active Locks"
                    value={stats.activeLocks || 0}
                    color="bg-pink-500"
                />

            </div>

            {/* Charts */}

            <div className="grid lg:grid-cols-2 gap-6">

                <RevenueChart />

                <OrdersChart />

            </div>

            {/* Tables */}

            <div className="grid lg:grid-cols-2 gap-6">

                <RecentOrders
                    orders={dashboard?.recentOrders || []}
                />

                <LowStockTable
                    products={dashboard?.lowStockProducts || []}
                />

            </div>

            <ActiveLocksTable
                locks={dashboard?.activeReservations || []}
            />

        </div>

    );

};

export default Dashboard;