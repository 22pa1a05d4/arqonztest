#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Atlas Setup for MERN Stack App\n');

const questions = [
  {
    question: 'Enter your MongoDB Atlas connection string: ',
    key: 'MONGODB_URI',
    example: 'mongodb+srv://username:password@cluster.mongodb.net/dnx-settings?retryWrites=true&w=majority'
  },
  {
    question: 'Enter a strong JWT secret key: ',
    key: 'JWT_SECRET',
    example: 'your_super_secret_jwt_key_here'
  },
  {
    question: 'Enter your frontend URL (default: http://localhost:3000): ',
    key: 'FRONTEND_URL',
    default: 'http://localhost:3000'
  },
  {
    question: 'Enter your backend port (default: 5000): ',
    key: 'PORT',
    default: '5000'
  }
];

const answers = {};

const askQuestion = (index) => {
  if (index >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[index];
  const prompt = q.default ? `${q.question}(${q.default}) ` : q.question;
  
  rl.question(prompt, (answer) => {
    answers[q.key] = answer || q.default || '';
    askQuestion(index + 1);
  });
};

const createEnvFile = () => {
  const envContent = `# MongoDB Atlas Configuration
MONGODB_URI=${answers.MONGODB_URI}

# JWT Secret
JWT_SECRET=${answers.JWT_SECRET}

# Server Configuration
PORT=${answers.PORT}
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=${answers.FRONTEND_URL}

# Host for port forwarding (optional)
HOST=0.0.0.0
`;

  const envPath = path.join(__dirname, 'backend', '.env');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Environment file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    
    // Also create frontend .env
    const frontendEnvContent = `REACT_APP_API_URL=http://localhost:${answers.PORT}/api
`;
    const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
    fs.writeFileSync(frontendEnvPath, frontendEnvContent);
    console.log(`📁 Frontend .env: ${frontendEnvPath}`);
    
    console.log('\n🎉 Setup complete! Next steps:');
    console.log('1. cd backend && npm install');
    console.log('2. cd frontend && npm install');
    console.log('3. cd backend && npm run dev');
    console.log('4. cd frontend && npm start');
    console.log('\n📱 For mobile testing:');
    console.log('1. Install ngrok: npm install -g ngrok');
    console.log('2. Start backend: cd backend && npm run dev');
    console.log('3. In another terminal: ngrok http 5000');
    console.log('4. Copy the ngrok URL and update frontend .env');
    
  } catch (error) {
    console.error('❌ Error creating environment file:', error.message);
  }
  
  rl.close();
};

// Start the setup
askQuestion(0);
