#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Setting up Port Forwarding for MERN Stack App\n');

// Check if ngrok is installed
const checkNgrok = () => {
  return new Promise((resolve) => {
    const ngrok = spawn('ngrok', ['version'], { shell: true });
    ngrok.on('close', (code) => {
      resolve(code === 0);
    });
    ngrok.on('error', () => {
      resolve(false);
    });
  });
};

// Install ngrok if not present
const installNgrok = async () => {
  console.log('📦 Installing ngrok...');
  return new Promise((resolve, reject) => {
    const npm = spawn('npm', ['install', '-g', 'ngrok'], { shell: true });
    npm.on('close', (code) => {
      if (code === 0) {
        console.log('✅ ngrok installed successfully!');
        resolve();
      } else {
        reject(new Error('Failed to install ngrok'));
      }
    });
  });
};

// Start backend with port forwarding
const startBackend = () => {
  console.log('🔧 Starting backend server...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..', 'backend'),
    shell: true,
    stdio: 'inherit'
  });

  // Wait a bit for server to start
  setTimeout(() => {
    startNgrok();
  }, 3000);

  return backend;
};

// Start ngrok tunnel
const startNgrok = () => {
  console.log('🌐 Starting ngrok tunnel...');
  const ngrok = spawn('ngrok', ['http', '5000'], { shell: true });
  
  ngrok.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('https://')) {
      const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.ngrok\.io/);
      if (urlMatch) {
        console.log(`\n🎉 Your app is now accessible at: ${urlMatch[0]}`);
        console.log(`📱 Mobile devices can access: ${urlMatch[0]}`);
        console.log(`🔗 API endpoint: ${urlMatch[0]}/api`);
        console.log('\n📝 Update your frontend .env file:');
        console.log(`REACT_APP_API_URL=${urlMatch[0]}/api`);
      }
    }
  });

  ngrok.stderr.on('data', (data) => {
    console.error('ngrok error:', data.toString());
  });

  return ngrok;
};

// Main setup function
const setup = async () => {
  try {
    console.log('🔍 Checking for ngrok...');
    const hasNgrok = await checkNgrok();
    
    if (!hasNgrok) {
      console.log('❌ ngrok not found. Installing...');
      await installNgrok();
    } else {
      console.log('✅ ngrok is already installed!');
    }

    console.log('\n🚀 Starting port forwarding setup...');
    console.log('📋 Instructions:');
    console.log('1. Backend will start on port 5000');
    console.log('2. ngrok will create a public tunnel');
    console.log('3. Copy the ngrok URL to your frontend .env file');
    console.log('4. Start your frontend with: cd frontend && npm start\n');

    const backend = startBackend();

    // Handle cleanup on exit
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      backend.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Manual setup:');
    console.log('1. Install ngrok: npm install -g ngrok');
    console.log('2. Start backend: cd backend && npm run dev');
    console.log('3. Start ngrok: ngrok http 5000');
    console.log('4. Copy the ngrok URL to frontend .env');
  }
};

setup();
