import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';

import api from '../api';
import { 
  FiUsers, 
  FiClock, 
  FiCheck, 
  FiUpload, 
  FiCalendar,
  FiFileText,
  FiUser
} from 'react-icons/fi';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
      setError('Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  };

  const handleSubmit = () => {
    // Handle task submission logic here
    console.log('Task submitted');
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading task...</p>
        </div>
      </Layout>
    );
  }

  if (error || !task) {
    return (
      <Layout>
        <div className="content-card">
          <h1>Task Not Found</h1>
          <p>{error || 'The requested task could not be found.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/tasks')}>
            Back to Tasks
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="detail-task-container">
        {/* Main Content Area */}
        <div className="detail-main-content">
          {/* Video Player Section */}
          <div className="video-section">
            <div className="video-player">
              <iframe
                src={task.videoUrl}
                title={task.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Task Information */}
          <div className="task-info">
            <h1 className="task-title">{task.title}</h1>
            
            {/* Task Metadata */}
            <div className="task-metadata">
              <div className="metadata-item">
                <span className="category">{task.category} . {task.subcategory}</span>
                <a href="#" className="get-mentors-link">+Get Mentors</a>
              </div>
              <div className="metadata-stats">
                <div className="stat-item">
                  <FiUsers className="stat-icon" />
                  <span>{task.studentsInvolved} Students Involved</span>
                </div>
                <div className="stat-item">
                  <FiClock className="stat-icon" />
                  <span>{task.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="task-description">
              <h3>Description</h3>
              <p>{task.description}</p>
            </div>

            {/* Essence of Assessment */}
            <div className="assessment-section">
              <h3>Essence of Assessment</h3>
              <ul className="assessment-list">
                {task.assessmentPoints.map((point, index) => (
                  <li key={index} className={`assessment-item ${point.completed ? 'completed' : ''}`}>
                    <FiCheck className="check-icon" />
                    <span>{point.point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Web View) */}
        <div className="detail-sidebar">
          {/* Assigned Assignments */}
          <div className="assignments-section">
            <h3>Assigned Assignments</h3>
            {task.assignedAssignments.map((assignment, index) => (
              <div key={index} className="assignment-item">
                <h4>{assignment.title}</h4>
                <span className="assignment-category">{assignment.category}</span>
              </div>
            ))}
          </div>

          {/* Student Information */}
          <div className="student-section">
            <h3>Detail Student</h3>
            <div className="student-info">
              <div className="student-item">
                <div>
                  <span className="label">Student's name:</span>
                  <span className="value">{task.studentInfo.name}</span>
                </div>
              </div>
              <div className="student-item">
                <div>
                  <span className="label">Student Class:</span>
                  <span className="value">{task.studentInfo.class}</span>
                </div>
              </div>
              <div className="student-item">
                <div>
                  <span className="label">Student Number:</span>
                  <span className="value">{task.studentInfo.number}</span>
                </div>
              </div>
            </div>
          </div>

          {/* File Task Section */}
          <div className="file-task-section">
            <h3>File Task</h3>
            <div className="file-info">
              <div className="file-meta">
                <span>Last Modified: {new Date(task.fileSubmission.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="file-upload-area">
                <div className="upload-box">
                  <FiUpload className="upload-icon" />
                  <p>drag or browser from device</p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  className="file-input"
                  onChange={handleFileUpload}
                  multiple
                />
              </div>
              <button className="btn btn-primary submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetail;
