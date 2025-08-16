// import React from "react";

// const projects = [
//     {
//         id: 1,
//         title: "E-Commerce Dashboard",
//         description:
//             "A comprehensive dashboard for online stores with analytics, inventory management, and order processing.",
//         image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=800",
//         category: "Web App",
//         tech: ["React", "Node.js", "MongoDB"],
//         link: "#",
//     },
//     {
//         id: 2,
//         title: "Portfolio Website",
//         description:
//             "A personal portfolio website with CMS integration to showcase projects and blogs.",
//         image: "https://images.unsplash.com/photo-1522206024047-9c9254216757?q=80&w=800",
//         category: "Website",
//         tech: ["Next.js", "TailwindCSS", "Sanity"],
//         link: "#",
//     },
//     {
//         id: 3,
//         title: "Social Media App",
//         description:
//             "A real-time social platform for sharing updates, photos, and videos with friends.",
//         image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800",
//         category: "Mobile App",
//         tech: ["React Native", "Firebase", "Redux"],
//         link: "#",
//     },
//     {
//         id: 4,
//         title: "AI Chatbot",
//         description:
//             "An AI-powered chatbot for customer service with NLP and automated responses.",
//         image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
//         category: "AI Tool",
//         tech: ["Python", "TensorFlow", "Flask"],
//         link: "#",
//     },
// ];

// export const ProjectPage = ({ref}) => {
//     return (
//         <section className="py-10 px-6" ref={ref}>
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//                 Featured Projects
//             </h2>

//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-center">
//                 {projects.map((project) => (
//                     <div
//                         key={project.id}
//                         className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto"
//                     >
//                         {/* Image */}
//                         <div className="relative">
//                             <img
//                                 className="w-full h-36 object-cover"
//                                 src={project.image}
//                                 alt={project.title}
//                             />
//                             <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
//                                 {project.category}
//                             </span>
//                         </div>

//                         {/* Content */}
//                         <div className="p-4">
//                             <h3 className="text-base font-bold text-gray-900">{project.title}</h3>
//                             <p className="text-gray-500 mt-2 text-sm line-clamp-3">{project.description}</p>

//                             {/* Tech Stack */}
//                             <div className="flex flex-wrap gap-2 mt-3">
//                                 {project.tech.map((t, index) => (
//                                     <span
//                                         key={index}
//                                         className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
//                                     >
//                                         {t}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* View Details */}
//                             <a
//                                 href={project.link}
//                                 className="text-indigo-600 font-medium mt-3 inline-flex items-center gap-1 hover:underline"
//                             >
//                                 View Details
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-4 w-4"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M17 8l4 4m0 0l-4 4m4-4H3"
//                                     />
//                                 </svg>
//                             </a>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const ProjectPage = ({ ref }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get("http://localhost:4000/api/v1/projects",{ withCredentials: true });
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="py-10 px-6" ref={ref}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Projects
            </h2>

            {loading ? (
                <div className="text-center text-gray-500">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-center text-gray-500">No projects found.</div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-center">
                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    className="w-full h-36 object-cover"
                                    src={project.imageUrl}
                                    alt={project.title}
                                />
                                <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                                    {project.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-base font-bold text-gray-900">{project.title}</h3>
                                <p className="text-gray-500 mt-2 text-sm line-clamp-3">{project.description}</p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.technologies.map((t, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* View Details */}
                                <a
                                    href={project.link}
                                    className="text-indigo-600 font-medium mt-3 inline-flex items-center gap-1 hover:underline"
                                >
                                    View Details
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
