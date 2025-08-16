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
        axios.get("https://eazybyts-znpn.onrender.com/api/v1/projects",{withCredentials:true}),
        axios.get("https://eazybyts-znpn.onrender.com/api/v1/blogs",{withCredentials:true}),
        axios.get("https://eazybyts-znpn.onrender.com/api/v1/contact",{withCredentials:true}),
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
