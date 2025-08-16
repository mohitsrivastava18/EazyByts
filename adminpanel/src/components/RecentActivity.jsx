import React from 'react'
import { FaBlog, FaBriefcase, FaCog, FaUsers } from 'react-icons/fa';

export const RecentActivity = () => {
    const activityData = [
        {
          type: 'project',
          icon: <FaBriefcase className="text-white text-2xl" />,
          title: 'Project Updated',
          description: 'E-commerce Project was updated',
          time: '2 hours ago'
        },
        {
          type: 'blog',
          icon: <FaBlog className="text-white text-2xl" />,
          title: 'Blog Published',
          description: 'New blog post "Responsive Design Tips" was published',
          time: '3 hours ago'
        },
        {
          type: 'user',
          icon: <FaUsers className="text-white text-2xl" />,
          title: 'New Subscriber',
          description: 'John Doe subscribed to newsletter',
          time: 'Yesterday'
        },
        {
          type: 'settings',
          icon: <FaCog className="text-white text-2xl" />,
          title: 'Theme Changed',
          description: 'Updated to "Dark Ocean" theme',
          time: '2 days ago'
        }
      ];
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Recent Activity</h3>
                <button className="text-blue-500 text-sm font-medium">View All</button>
            </div>

            <div className="space-y-4">
                {activityData.map((activity, index) => (
                    <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${activity.type === 'project' ? 'bg-blue-500' :
                                activity.type === 'blog' ? 'bg-green-500' :
                                    activity.type === 'user' ? 'bg-yellow-500' :
                                        'bg-purple-500'
                            }`}>
                            {activity.icon}
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold">{activity.title}</h4>
                            <p className="text-lg text-gray-500">{activity.description}</p>
                            <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
