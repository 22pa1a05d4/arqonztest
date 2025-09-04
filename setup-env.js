#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment configuration for deployment...\n');

// Frontend .env file
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
const frontendEnvContent = `REACT_APP_API_URL=https://argonztest.onrender.com/api
`;

// Backend .env file
const backendEnvPath = path.join(__dirname, 'backend', '.env');
const backendEnvContent = `# MongoDB Atlas Configuration
MONGODB_URI=your_mongodb_atlas_connection_string_here

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
HOST=0.0.0.0
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://argonztest-ds8y.vercel.app
`;

try {
  // Create frontend .env
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Created frontend/.env');
  
  // Create backend .env
  fs.writeFileSync(backendEnvPath, backendEnvContent);
  console.log('✅ Created backend/.env');
  
  console.log('\n📝 Next steps:');
  console.log('1. Update backend/.env with your actual MongoDB Atlas connection string');
  console.log('2. Generate a strong JWT secret and update it in backend/.env');
  console.log('3. Deploy your backend to Render with the environment variables');
  console.log('4. Deploy your frontend to Vercel');
  console.log('\n🚀 Your app should now work correctly!');
  
} catch (error) {
  console.error('❌ Error creating environment files:', error.message);
  process.exit(1);
}
