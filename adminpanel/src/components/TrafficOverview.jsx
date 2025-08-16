import React from 'react'

export const TrafficOverview = () => {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Traffic Overview</h3>
                <button className="text-blue-500 text-sm font-medium flex items-center">
                    View Report
                </button>
            </div>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex flex-col items-center justify-center">
                <div className="flex items-end justify-center h-40 gap-2">
                    {[40, 70, 50, 90, 60, 80, 65].map((height, index) => (
                        <div
                            key={index}
                            className="w-8 bg-blue-400 rounded-t-md animate-pulse"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
                <p className="mt-4 text-gray-500 font-medium">Traffic Analytics Chart</p>
            </div>
        </div>

    )
}
