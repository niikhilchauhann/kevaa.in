import React, { useState, useEffect } from "react";
import useCartStore from "../../store/cartStore";
import { format } from "date-fns";
import { ORDER_STATUS_STEPS } from "../../utils/constants";
import './adminDashboard.css';

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // ➡️ Selected order for tracking
    const fetchAllOrders = useCartStore((s) => s.fetchAllOrders);
    const updateOrderStatus = useCartStore((s) => s.updateOrderStatus);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setOrders(await fetchAllOrders());
            setLoading(false);
        };
        run();
    }, [fetchAllOrders]);

    async function handleUpdateStatus(orderId, curStep, nextStep) {
        setLoading(true);
        const result = await updateOrderStatus(orderId, { step: nextStep });
        if (result.success) {
            setOrders((orders) =>
                orders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            status: { currentStep: nextStep },
                            statusLogs: [
                                ...(order.statusLogs || []),
                                { step: nextStep, time: new Date().toISOString() },
                            ],
                        }
                        : order
                )
            );
        } else {
            alert("Update failed: " + (result.error || "unknown error"));
        }
        setLoading(false);
    }

    // Function to render the timeline of status steps for the selected order
    function renderTimeline(order) {
        if (!order) return null;
        return (
            <div style={{ marginTop: 24, padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
                <h3>Status Timeline for Order {order.id.slice(-6)}</h3>
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                    {ORDER_STATUS_STEPS.map(({ step, label }) => {
                        const log = order.statusLogs?.find((l) => l.step === step);
                        const isActive = !!log;
                        return (
                            <li
                                key={step}
                                style={{
                                    color: isActive ? "green" : "#aaa",
                                    fontWeight: isActive ? "bold" : "normal",
                                    marginBottom: 8,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <span>{label}</span>
                                <span style={{ fontSize: 12, color: "#555" }}>
                                    {log ? format(new Date(log.time), "dd MMM yyyy, h:mm a") : "-"}
                                </span>
                            </li>
                        );
                    })}
                </ul>

                <div>
                    <h4>Items Status</h4>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.name} — Status: <strong>{item.status?.currentStep || "Ordered"}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Orders Dashboard</h1>
            {loading && <div>Loading...</div>}
            {orders.length === 0 && !loading && <div>No orders.</div>}

            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>OrderID</th>
                        <th>User&nbsp;ID</th>
                        <th>Date</th>
                        <th>Current Status</th>
                        <th>Timeline</th>
                        <th>Items</th>
                        <th>Update/Approve Status</th>
                        <th>Track Order</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o, orderIdx) => {
                        const curStep = o.status?.currentStep || "Ordered";
                        const curStepIdx = ORDER_STATUS_STEPS.findIndex((s) => s.step === curStep);
                        const nextStepObj = ORDER_STATUS_STEPS[curStepIdx + 1];

                        return (
                            <tr key={o.id}>
                                <td style={{ fontWeight: 600 }}>{o.id.slice(-6)}</td>
                                <td>{o.userId}</td>
                                <td>
                                    {o.createdAt?.toDate
                                        ? format(o.createdAt.toDate(), "dd MMM yy, h:mma")
                                        : new Date(o.createdAt).toLocaleString()}
                                </td>
                                <td>{curStep}</td>
                                <td>
                                    <ul className="timeline-list">
                                        {ORDER_STATUS_STEPS.map((s) => {
                                            const hasStep = o.statusLogs?.some((l) => l.step === s.step);
                                            return (
                                                <li key={s.step} className={hasStep ? "active" : ""}>
                                                    {s.step}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </td>
                                <td>
                                    <ul className="items-list">
                                        {o.items?.map((itm) => (
                                            <li key={itm.id}>
                                                {itm.name || 'Product Name'} × {itm.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {nextStepObj ? (
                                        <button
                                            className="status-btn"
                                            disabled={loading}
                                            onClick={() => handleUpdateStatus(o.id, curStep, nextStepObj.step)}
                                        >
                                            {nextStepObj.label}
                                        </button>
                                    ) : (
                                        <span className="complete-label">✅ Complete</span>
                                    )}
                                </td>
                                <td>
                                    <button className="track-btn" onClick={() => setSelectedOrder(o)}>
                                        Track
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Selected Order Timeline */}
            {selectedOrder && (
                <div className="selected-order-timeline">
                    <h3>Status Timeline for Order {selectedOrder.id.slice(-6)}</h3>
                    <ul>
                        {STATUS_STEPS.map(({ step, label }) => {
                            const log = selectedOrder.statusLogs?.find((l) => l.step === step);
                            const isActive = !!log;
                            return (
                                <li key={step} className={isActive ? "active" : ""}>
                                    <span>{label}</span>
                                    <span>{log ? format(new Date(log.time), "dd MMM yyyy, h:mm a") : "-"}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <h4>Items Status</h4>
                    <ul className="items-status">
                        {selectedOrder.items.map((item) => (
                            <li key={item.id}>
                                {item.name || 'Product Name'} — Status: <strong>{item.status?.currentStep || "Ordered"}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="footer-note">*Only admin/staff can see and use this page.</div>
        </div>


    );
}

export default AdminDashboard;