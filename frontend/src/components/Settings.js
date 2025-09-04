import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    language: 'English (Default)',
    timezone: 'English (Default)',
    timeFormat: '24 Hours',
    notifications: {
      message: true,
      taskUpdate: false,
      taskDeadline: true,
      mentorHelp: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleGeneralChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.put('/settings', settings);
      setSettings(response.data);
      
      // Update user context with new settings
      if (user) {
        updateUser({
          ...user,
          settings: response.data
        });
      }
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
    
    setLoading(false);
  };

  const renderGeneralSettings = () => (
    <div className="tab-content">
      <div className="settings-section">
        <div className="form-group">
          <label className="form-label">Language</label>
          <select
            className="form-control form-select"
            value={settings.language}
            onChange={(e) => handleGeneralChange('language', e.target.value)}
          >
            <option value="English (Default)">English (Default)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Timezone (Location)</label>
          <select
            className="form-control form-select"
            value={settings.timezone}
            onChange={(e) => handleGeneralChange('timezone', e.target.value)}
          >
            <option value="English (Default)">English (Default)</option>
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
            <option value="GMT">Greenwich Mean Time</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Timezone (Format)</label>
          <div className="radio-group">
            <div className="radio-item">
              <div 
                className={`radio-input ${settings.timeFormat === '24 Hours' ? 'checked' : ''}`}
                onClick={() => handleGeneralChange('timeFormat', '24 Hours')}
              ></div>
              <span>24 Hours</span>
            </div>
            <div className="radio-item">
              <div 
                className={`radio-input ${settings.timeFormat === '12 Hours' ? 'checked' : ''}`}
                onClick={() => handleGeneralChange('timeFormat', '12 Hours')}
              ></div>
              <span>12 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="tab-content">
      <div className="settings-section">
        <div className="notification-item">
          <div>
            <div className="notification-label">Message</div>
            <div className="notification-description">Receive notifications for new messages</div>
          </div>
          <div 
            className={`toggle-switch ${settings.notifications.message ? 'active' : ''}`}
            onClick={() => handleNotificationChange('message', !settings.notifications.message)}
          ></div>
        </div>

        <div className="notification-item">
          <div>
            <div className="notification-label">Task Update</div>
            <div className="notification-description">Get notified when tasks are updated</div>
          </div>
          <div 
            className={`toggle-switch ${settings.notifications.taskUpdate ? 'active' : ''}`}
            onClick={() => handleNotificationChange('taskUpdate', !settings.notifications.taskUpdate)}
          ></div>
        </div>

        <div className="notification-item">
          <div>
            <div className="notification-label">Task Deadline</div>
            <div className="notification-description">Reminders for upcoming task deadlines</div>
          </div>
          <div 
            className={`toggle-switch ${settings.notifications.taskDeadline ? 'active' : ''}`}
            onClick={() => handleNotificationChange('taskDeadline', !settings.notifications.taskDeadline)}
          ></div>
        </div>

        <div className="notification-item">
          <div>
            <div className="notification-label">Mentor Help</div>
            <div className="notification-description">Notifications from mentors and help requests</div>
          </div>
          <div 
            className={`toggle-switch ${settings.notifications.mentorHelp ? 'active' : ''}`}
            onClick={() => handleNotificationChange('mentorHelp', !settings.notifications.mentorHelp)}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="content-card">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === 'notification' ? 'active' : ''}`}
            onClick={() => setActiveTab('notification')}
          >
            Notification
          </button>
        </div>

        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'notification' && renderNotificationSettings()}

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={loading}
          style={{ marginTop: '24px' }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
    </Layout>
  );
};

export default Settings;



