// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaArrowDown,
//   FaArrowUp,
//   FaBlog,
//   FaBriefcase,
//   FaEnvelope,
//   FaUsers,
// } from "react-icons/fa";

// axios.defaults.withCredentials = true; // ensures cookies (JWT) are sent

// export const StatsCard = () => {
//   const [stats, setStats] = useState({
//     projects: 0,
//     blogs: 0,
//     messages: 0,
//     visitors: 1254, // static for now
//   });

//   const fetchStats = async () => {
//     try {
//       const [projectsRes, blogsRes, contactRes] = await Promise.all([
//         axios.get("https://portfolio-cms-adminpanel.onrender.com/api/v1/projects", {
//           withCredentials: true
//         }),
//         axios.get("https://portfolio-cms-adminpanel.onrender.com/api/v1/blogs", {
//           withCredentials: true
//         }),
//         axios.get("https://portfolio-cms-adminpanel.onrender.com/api/v1/contact", {
//           withCredentials: true
//         }),
//       ]);

//       setStats({
//         projects: projectsRes.data?.length || 0,
//         blogs: blogsRes.data?.length || 0,
//         messages: contactRes.data?.length || 0,
//         visitors: 1254, // replace with API if available
//       });
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const statsData = [
//     {
//       title: "Total Projects",
//       value: stats.projects,
//       icon: <FaBriefcase className="text-blue-500 text-4xl" />,
//       trend: { direction: "up", value: "15% from last month" },
//     },
//     {
//       title: "Blog Posts",
//       value: stats.blogs,
//       icon: <FaBlog className="text-green-500 text-4xl" />,
//       trend: { direction: "up", value: "8% from last month" },
//     },
//     {
//       title: "New Messages",
//       value: stats.messages,
//       icon: <FaEnvelope className="text-red-500 text-4xl" />,
//       trend: { direction: "down", value: "3% from last week" },
//     },
//     {
//       title: "Monthly Visitors",
//       value: stats.visitors.toLocaleString(),
//       icon: <FaUsers className="text-purple-500 text-4xl" />,
//       trend: { direction: "up", value: "25% from last month" },
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
//       {statsData.map((stat, index) => (
//         <div
//           key={index}
//           className="bg-white rounded-xl shadow p-5 flex items-center gap-5 transition-all hover:shadow-md"
//         >
//           <div
//             className={`w-20 h-20 rounded-xl flex items-center justify-center ${stat.title === "Total Projects"
//               ? "bg-blue-100"
//               : stat.title === "Blog Posts"
//                 ? "bg-green-100"
//                 : stat.title === "New Messages"
//                   ? "bg-red-100"
//                   : "bg-purple-100"
//               }`}
//           >
//             {stat.icon}
//           </div>
//           <div>
//             <h3 className="text-3xl font-bold">{stat.value}</h3>
//             <p className="text-gray-500 text-lg">{stat.title}</p>
//             <div
//               className={`flex items-center mt-1 text-lg ${stat.trend.direction === "up"
//                 ? "text-green-500"
//                 : "text-red-500"
//                 }`}
//             >
//               {stat.trend.direction === "up" ? <FaArrowUp /> : <FaArrowDown />}
//               <span className="ml-1">{stat.trend.value}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const StatsCard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get(
//           'https://portfolio-cms-adminpanel.onrender.com/api/v1/projects'
//         );
//         setProjects(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch projects');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   if (loading) return <div>Loading projects...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Projects</h2>
//       {projects.length === 0 ? (
//         <p>No projects found.</p>
//       ) : (
//         <ul>
//           {projects.map((project) => (
//             <li
//               key={project._id}
//               style={{
//                 border: '1px solid #ccc',
//                 padding: '10px',
//                 marginBottom: '15px',
//                 borderRadius: '8px',
//               }}
//             >
//               <p><strong>ID:</strong> {project._id}</p>
//               <p><strong>Title:</strong> {project.title}</p>
//               <p><strong>Description:</strong> {project.description}</p>
//               <p><strong>Category:</strong> {project.category}</p>
//               <p>
//                 <strong>Technologies:</strong>{' '}
//                 {project.technologies?.join(', ') || 'N/A'}
//               </p>
//               <p>
//                 <strong>Image:</strong>{' '}
//                 <img
//                   src={project.imageUrl}
//                   alt={project.title}
//                   style={{ maxWidth: '200px', display: 'block' }}
//                 />
//               </p>
//               <p>
//                 <strong>Link:</strong>{' '}
//                 <a href={project.link} target="_blank" rel="noopener noreferrer">
//                   {project.link}
//                 </a>
//               </p>
//               <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
//               <p><strong>Updated At:</strong> {new Date(project.updatedAt).toLocaleString()}</p>
//               <p><strong>__v:</strong> {project.__v}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowDown,
  FaArrowUp,
  FaBlog,
  FaBriefcase,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

axios.defaults.withCredentials = true; // ensure cookies (JWT) are sent

export const StatsCard = () => {
  const [stats, setStats] = useState({
    projects: [],
    blogs: [],
    messages: [],
    visitors: 1254,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [projectsRes, blogsRes, contactRes] = await Promise.all([
        axios.get("http://localhost:4000/api/v1/projects",{withCredentials:true}),
        axios.get("http://localhost:4000/api/v1/blogs",{withCredentials:true}),
        axios.get("http://localhost:4000/api/v1/contact",{withCredentials:true}),
      ]);

      console.log("Hello")
      setStats({
        projects: projectsRes.data || [],
        blogs: blogsRes.data || [],
        messages: contactRes.data || [],
        visitors: 1254,
      });
    } catch (error) {
      console.error("Error fetching stats:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  const statsData = [
    {
      title: "Total Projects",
      value: stats.projects.length,
      icon: <FaBriefcase className="text-blue-500 text-4xl" />,
      trend: { direction: "up", value: "15% from last month" },
      details: stats.projects,
    },
    {
      title: "Blog Posts",
      value: stats.blogs.length,
      icon: <FaBlog className="text-green-500 text-4xl" />,
      trend: { direction: "up", value: "8% from last month" },
      details: stats.blogs,
    },
    {
      title: "New Messages",
      value: stats.messages.length,
      icon: <FaEnvelope className="text-red-500 text-4xl" />,
      trend: { direction: "down", value: "3% from last week" },
      details: stats.messages,
    },
    {
      title: "Monthly Visitors",
      value: stats.visitors.toLocaleString(),
      icon: <FaUsers className="text-purple-500 text-4xl" />,
      trend: { direction: "up", value: "25% from last month" },
      details: [],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-5 flex flex-col gap-4 transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-5">
            <div
              className={`w-20 h-20 rounded-xl flex items-center justify-center ${
                stat.title === "Total Projects"
                  ? "bg-blue-100"
                  : stat.title === "Blog Posts"
                  ? "bg-green-100"
                  : stat.title === "New Messages"
                  ? "bg-red-100"
                  : "bg-purple-100"
              }`}
            >
              {stat.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-lg">{stat.title}</p>
              <div
                className={`flex items-center mt-1 text-lg ${
                  stat.trend.direction === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {stat.trend.direction === "up" ? <FaArrowUp /> : <FaArrowDown />}
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};
