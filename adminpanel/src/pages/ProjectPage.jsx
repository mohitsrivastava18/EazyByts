import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEllipsisV, FaSearch } from 'react-icons/fa';
import ProjectFormModal from '../popupModels/ProjectFormModal';
import axios from 'axios';
import { DeletePopupModel } from '../popupModels/DeletePopupModel';

function ProjectPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null });
  const [formModalState, setFormModalState] = useState({ isOpen: false, projectData: null }); // Single state for add/edit modal
  const [refreshKey, setRefreshKey] = useState(0);

  const API_ENDPOINT = 'https://eazybyts-backend-kp6l.onrender.com';

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_ENDPOINT, { withCredentials: true });
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
    console.log("Refresh")
  }, [refreshKey]);

  // One function to handle both add and update API calls
  const handleSaveProject = async (formData, projectId = null) => {
    try {
      if (projectId) {
        // Update logic (PUT request)
        await axios.put(`${API_ENDPOINT}/${projectId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      } else {
        // Add logic (POST request)
        await axios.post(API_ENDPOINT, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
      }
       setRefreshKey(prevKey => prevKey + 1);
      //  fetchProjects(); // Re-fetch to update the UI
      handleCloseFormModal();
     
    } catch (error) {
      console.error("Failed to save project:", error.response?.data || error);
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteModal.projectId) return;

    try {
      await axios.delete(`${API_ENDPOINT}/${deleteModal.projectId}`, { withCredentials: true });
      fetchProjects();
       setRefreshKey(prevKey => prevKey + 1);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Failed to delete project:", error.response?.data || error);
    }
  };

  const filteredProjects = projects.filter(project =>
    (activeTab === 'all' || project.status === activeTab) &&
    project.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getStatusClasses = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Open modal for adding a project
  const handleOpenAddModal = () => {
    setFormModalState({ isOpen: true, projectData: null });
  };

  // Open modal for editing a project
  const handleOpenEditModal = (project) => {
    setFormModalState({ isOpen: true, projectData: project });
  };

  // Close the form modal (for both add and edit)
  const handleCloseFormModal = () => {
    setFormModalState({ isOpen: false, projectData: null });
  };

  const handleOpenDeleteModal = (projectId) => {
    setDeleteModal({ isOpen: true, projectId: projectId });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, projectId: null });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:col-span-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Projects</h1>
            <p className="text-base text-gray-600 mt-1">Manage and view your projects</p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-base"
              />
              <FaSearch className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button onClick={handleOpenAddModal} className="w-full md:w-auto px-6 py-2 bg-blue-600 cursor-pointer text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <FaPlus />
              <span>Add New Project</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Project Dashboard</h2>
            <div className="flex flex-wrap space-x-2">
              {['all', 'published', 'draft', 'archived'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div className="col-span-5">PROJECT</div>
            <div className="col-span-3">TECH STACK</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2 text-right">ACTIONS</div>
          </div>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project._id}
                className="p-4 md:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    {project.technologies.map((technologies, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                        {technologies}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClasses(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2 text-gray-400">
                    <button onClick={() => handleOpenEditModal(project)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors hover:text-blue-500"><FaEdit /></button>
                    <button onClick={() => handleOpenDeleteModal(project._id)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors hover:text-red-500"><FaTrash /></button>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors hover:text-gray-700"><FaEllipsisV /></button>
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="flex items-center mb-4">
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusClasses(project.status)}`}>
                        {project.status}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 2).map((technologies, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                            {technologies}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 text-gray-400">
                      <button onClick={() => handleOpenEditModal(project)} className="p-2 rounded-lg hover:bg-gray-200 hover:text-blue-500"><FaEdit /></button>
                      <button onClick={() => handleOpenDeleteModal(project._id)} className="p-2 rounded-lg hover:bg-gray-200 hover:text-red-500"><FaTrash /></button>
                      <button className="p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700"><FaEllipsisV /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">No projects found for this filter.</div>
          )}
          <div className="p-4 md:p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-600 text-sm mb-2 md:mb-0">Showing {filteredProjects.length} of {projects.length} projects</p>
            <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 Portfolio CMS Dashboard • Last refresh: Today at 2:45 PM</p>
        </footer>
      </div>

      <ProjectFormModal
        isOpen={formModalState.isOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveProject}
        initialData={formModalState.projectData}
      />
      <DeletePopupModel
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteProject}
      />
    </div>
  );
}

export default ProjectPage;