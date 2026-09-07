import React from 'react';

const UsersTab = ({ users }) => {
    return (
        <div className="bg-white rounded-2xl lg:rounded-3xl border border-[#ececec] shadow-sm overflow-hidden">
            {users.length > 0 ? (
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left min-w-100">
                        <thead className="bg-[#F4F7F0] text-[#546375] text-[10px] lg:text-[11px] uppercase tracking-widest">
                            <tr>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Name</th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr key={i} className="border-t border-[#ececec] hover:bg-gray-50 transition-colors">
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-[#232323] text-xs lg:text-sm capitalize">{u.name}</td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-[#546375] text-xs lg:text-sm">{u.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-10 text-center text-gray-500 font-bold text-sm">No registered users found.</div>
            )}
        </div>
    );
};

export default UsersTab;