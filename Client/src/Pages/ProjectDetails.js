import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Projects.css';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!project) return <div className="text-center mt-5">Project not found</div>;

 return (
  <div className="container mt-5">
    <h2 className="text-center mb-4">{project.title}</h2>

    <img
      src={project.image_url}
      alt={project.title}
      className="img-fluid mb-4"
      style={{ borderRadius: '15px', maxHeight: '400px', objectFit: 'cover' }}
    />

    <p className="lead">{project.description}</p>

    <hr />

    <h4>Details</h4>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
      {project.details || 'No additional details provided.'}
    </p>
  </div>
);

}

export default ProjectDetails;
