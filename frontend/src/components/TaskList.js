import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
// import axios from 'axios';
import api from "../api";

import { 
  FiUsers, 
  FiClock, 
  FiPlay,
  FiSearch,
  FiFilter,
  FiTag
} from 'react-icons/fi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Categorize tasks
  const timeLimitTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const newTasks = filteredTasks.filter(task => task.status === 'pending');

  const getProgressPercentage = (task) => {
    if (task.status === 'completed') return 100;
    if (task.status === 'in_progress') return Math.floor(Math.random() * 40) + 60; // 60-100%
    return Math.floor(Math.random() * 60) + 20; // 20-80%
  };

  const getTimeLeft = (task) => {
    if (task.status === 'completed') return 'Completed';
    if (task.status === 'in_progress') return `${Math.floor(Math.random() * 5) + 1} Hour`;
    return `${Math.floor(Math.random() * 7) + 1} Days Left`;
  };

  // Array of diverse tech/design images
  const techImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Web development desk
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Mobile app design
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // UI/UX design
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Coding laptop
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Design workspace
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Data analysis
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Team collaboration
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Color palette design
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Mobile devices
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Website development
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center&auto=format&q=80', // Dashboard design
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop&crop=center&auto=format&q=80'  // Project planning
  ];

  const getTaskImage = (task, index) => {
    return techImages[index % techImages.length];
  };


  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="explore-task-container">
        {/* Search and Filters */}
        <div className="task-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Task"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <FiSearch className="search-icon" />
          </div>
          <div className="filter-controls">
            <div className="control-item">
              <FiTag className="control-icon" />
              <span>Category</span>
            </div>
            <div className="control-item">
              <FiFilter className="control-icon" />
              <span>Sort By: Deadline</span>
            </div>
          </div>
        </div>

        {/* Time Limit Section */}
        <div className="task-section">
          <div className="section-header">
            <h2>Time Limit</h2>
          </div>
          <div className="task-cards-container">
            <div className="task-cards-scroll">
              {timeLimitTasks.map((task, index) => (
                <Link key={task._id} to={`/tasks/${task._id}`} className="explore-task-card">
                  <div className="task-image">
                    <img src={getTaskImage(task, index)} alt={task.title} />
                  </div>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p className="task-category">{task.category}</p>
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${getProgressPercentage(task)}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">Progress {getProgressPercentage(task)}%</span>
                    </div>
                    <div className="task-footer">
                      <div className="time-info">
                        <FiClock className="time-icon" />
                        <span>{getTimeLeft(task)}</span>
                      </div>
                      <div className="avatars">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="avatar">
                            <img src={`https://i.pravatar.cc/30?img=${i + 1}`} alt={`User ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* New Task Section */}
        <div className="task-section">
          <div className="section-header">
            <h2>New Task</h2>
          </div>
          <div className="task-cards-container">
            <div className="task-cards-scroll">
              {newTasks.map((task, index) => (
                <Link key={task._id} to={`/tasks/${task._id}`} className="explore-task-card">
                  <div className="task-image">
                    <img src={getTaskImage(task, index + 100)} alt={task.title} />
                  </div>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p className="task-category">{task.category}</p>
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${getProgressPercentage(task)}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">Progress {getProgressPercentage(task)}%</span>
                    </div>
                    <div className="task-footer">
                      <div className="time-info">
                        <FiClock className="time-icon" />
                        <span>{getTimeLeft(task)}</span>
                      </div>
                      <div className="avatars">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="avatar">
                            <img src={`https://i.pravatar.cc/30?img=${i + 5}`} alt={`User ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskList;
