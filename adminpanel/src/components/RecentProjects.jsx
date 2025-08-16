import React from 'react'

export const RecentProjects = () => {
    const projectsData = [
        {
          name: 'E-commerce Website',
          tech: 'React, Node.js, MongoDB',
          status: 'published'
        },
        {
          name: 'Portfolio Redesign',
          tech: 'HTML, CSS, JavaScript',
          status: 'published'
        },
        {
          name: 'Mobile Banking App',
          tech: 'React Native, Firebase',
          status: 'draft'
        }
      ];
  return (
    <div className="bg-white rounded-xl shadow p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Projects</h3>
                <button className="text-blue-500 text-sm font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {projectsData.map((project, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-500">{project.tech}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
  )
}
