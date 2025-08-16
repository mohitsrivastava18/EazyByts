import React from 'react'

export const RecentMessages = () => {
     const messagesData = [
        {
          initials: 'JD',
          name: 'John Doe',
          message: 'Hello, I\'m interested in your services. Can we schedule a call to discuss my project requirements?',
          time: 'Today, 10:30 AM'
        },
        {
          initials: 'SA',
          name: 'Sarah Anderson',
          message: 'I saw your portfolio and I\'m impressed with your React projects. Do you have availability for freelance work?',
          time: 'Yesterday, 4:15 PM'
        },
        {
          initials: 'MJ',
          name: 'Mike Johnson',
          message: 'Thanks for the quick response! I\'ve attached the project brief as requested.',
          time: 'Yesterday, 11:20 AM'
        }
      ];
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Messages</h3>
                <button className="text-blue-500 text-sm font-medium">View All</button>
            </div>

            <div className="space-y-4">
                {messagesData.map((message, index) => (
                    <div key={index} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
                            {message.initials}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium">{message.name}</h4>
                            <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
