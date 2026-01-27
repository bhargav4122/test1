// AdminSubscribers.jsx
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Search, Trash2, Mail, Calendar, Download, Filter } from "lucide-react";

export default function AdminSubscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    useEffect(() => {
        if (search) {
            const filtered = subscribers.filter(sub =>
                sub.email.toLowerCase().includes(search.toLowerCase()) ||
                (sub.name && sub.name.toLowerCase().includes(search.toLowerCase()))
            );
            setFiltered(filtered);
        } else {
            setFiltered(subscribers);
        }
    }, [search, subscribers]);

    const fetchSubscribers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "subscribers"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().timestamp?.toDate?.() || new Date()
            }));
            setSubscribers(data);
            setFiltered(data);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSubscriber = async (id, email) => {
        if (window.confirm(`Unsubscribe ${email}?`)) {
            try {
                await deleteDoc(doc(db, "subscribers", id));
                setSubscribers(prev => prev.filter(sub => sub.id !== id));
                alert("Unsubscribed successfully!");
            } catch (error) {
                alert("Error unsubscribing");
            }
        }
    };

    const exportCSV = () => {
        const headers = ["Email", "Date Subscribed", "Name", "Role"];
        const csvData = filtered.map(sub => [
            sub.email,
            sub.date.toLocaleDateString(),
            sub.name || "N/A",
            sub.role || "N/A"
        ]);

        const csvContent = [
            headers.join(","),
            ...csvData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
                            <p className="text-gray-600">Total: {subscribers.length} subscribers</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={exportCSV}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Download size={18} />
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by email or name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Subscribers Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date Subscribed
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Additional Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            Loading subscribers...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No subscribers found
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((subscriber) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Mail size={16} className="text-gray-400 mr-2" />
                                                    <a
                                                        href={`mailto:${subscriber.email}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {subscriber.email}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <Calendar size={16} className="text-gray-400 mr-2" />
                                                    {subscriber.date.toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {subscriber.name && <div>Name: {subscriber.name}</div>}
                                                    {subscriber.role && <div>Role: {subscriber.role}</div>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => deleteSubscriber(subscriber.id, subscriber.email)}
                                                    className="text-red-600 hover:text-red-900 flex items-center gap-2"
                                                >
                                                    <Trash2 size={16} />
                                                    Unsubscribe
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}