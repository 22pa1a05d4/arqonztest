import React from 'react';
import Layout from './Layout';

const Dashboard = () => {
  console.log('Dashboard component rendering');
  
  return (
    <Layout>
      <div className="content-card">
        <h1 className="page-title">Welcome to DNX</h1>
        <p>This is your dashboard. Navigate to Settings to manage your preferences.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;


