import { FaReact, FaServer, FaDatabase, FaPaintBrush } from "react-icons/fa";

const skills = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces with React, Vue.js, and modern JavaScript.",
    icon: <FaReact size={40} className="text-indigo-500" />,
  },
  {
    id: 2,
    title: "Backend Development",
    description:
      "Developing robust server-side applications with Node.js, Express, and database integration.",
    icon: <FaServer size={40} className="text-indigo-500" />,
  },
  {
    id: 3,
    title: "Database Management",
    description:
      "Designing and implementing database solutions with MongoDB, PostgreSQL, and Firebase.",
    icon: <FaDatabase size={40} className="text-indigo-500" />,
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user experiences with modern design principles.",
    icon: <FaPaintBrush size={40} className="text-indigo-500" />,
  },
];

export const SkillPage = ({ref}) => {
  return (
    <section className="bg-gray-50 py-16" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          My Skills & Expertise
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Technical skills and professional expertise I've developed throughout my career.
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="bg-indigo-50 w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4">
                {skill.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
