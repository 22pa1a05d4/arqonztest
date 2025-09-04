# Deployment Guide - MERN Stack Task Management App

## 🚀 Quick Setup

### 1. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (choose the free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `dnx-settings`)

3. **Configure Environment Variables**
   ```bash
   # Copy the example file
   cp backend/.env.example backend/.env
   
   # Edit the .env file with your Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dnx-settings?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

### 2. Port Forwarding Setup

#### For Local Development with Port Forwarding:
```bash
# Backend with port forwarding (accessible from other devices)
cd backend
npm run dev:forward

# Frontend (normal development)
cd frontend
npm start
```

#### For Production Deployment:
```bash
# Backend
cd backend
npm start

# Frontend (build for production)
cd frontend
npm run build
```

### 3. Environment Variables

#### Backend (.env)
```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dnx-settings?retryWrites=true&w=majority

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
HOST=0.0.0.0
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
# For production:
# REACT_APP_API_URL=https://your-backend-domain.com/api
```

### 4. Database Seeding

After setting up Atlas connection:
```bash
cd backend
npm run seed
```

This will populate your Atlas database with sample tasks.

## 🌐 Deployment Options

### Option 1: Heroku Deployment

1. **Backend Deployment**
   ```bash
   # Install Heroku CLI
   # Login to Heroku
   heroku login
   
   # Create Heroku app
   heroku create your-app-name-backend
   
   # Set environment variables
   heroku config:set MONGODB_URI=your_atlas_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   
   # Deploy
   git push heroku main
   ```

2. **Frontend Deployment**
   ```bash
   # Create another Heroku app for frontend
   heroku create your-app-name-frontend
   
   # Set buildpack for React
   heroku buildpacks:set mars/create-react-app
   
   # Set environment variables
   heroku config:set REACT_APP_API_URL=https://your-backend-app.herokuapp.com/api
   
   # Deploy
   git push heroku main
   ```

### Option 2: Vercel Deployment

1. **Frontend (Vercel)**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build`
   - Set output directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

2. **Backend (Railway/Render)**
   - Deploy backend to Railway or Render
   - Set environment variables
   - Update frontend API URL

### Option 3: Netlify + Railway

1. **Frontend (Netlify)**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

2. **Backend (Railway)**
   - Connect GitHub repository
   - Set environment variables
   - Deploy automatically

## 🔧 Port Forwarding for Local Development

### Using ngrok (Recommended)
```bash
# Install ngrok
npm install -g ngrok

# Start your backend
cd backend
npm run dev

# In another terminal, expose port 5000
ngrok http 5000

# Use the provided URL (e.g., https://abc123.ngrok.io) as your API URL
```

### Using localtunnel
```bash
# Install localtunnel
npm install -g localtunnel

# Start your backend
cd backend
npm run dev

# In another terminal, expose port 5000
lt --port 5000

# Use the provided URL as your API URL
```

## 📱 Mobile Testing

### For Mobile Device Testing:
1. Use port forwarding (ngrok/localtunnel)
2. Update frontend API URL to the forwarded URL
3. Access from mobile device using the forwarded URL

### Example Mobile Setup:
```bash
# Backend with ngrok
ngrok http 5000
# Copy the https URL (e.g., https://abc123.ngrok.io)

# Update frontend .env
REACT_APP_API_URL=https://abc123.ngrok.io/api

# Start frontend
cd frontend
npm start
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **CORS Configuration**
   - Set specific origins in production
   - Avoid using wildcard (*) in production

3. **MongoDB Atlas**
   - Enable IP whitelist
   - Use strong passwords
   - Enable database authentication

## 🐛 Troubleshooting

### Common Issues:

1. **Connection Refused**
   - Check if backend is running
   - Verify port numbers
   - Check firewall settings

2. **CORS Errors**
   - Verify FRONTEND_URL in backend .env
   - Check CORS configuration

3. **Database Connection Issues**
   - Verify Atlas connection string
   - Check IP whitelist in Atlas
   - Verify database user permissions

4. **Port Forwarding Issues**
   - Try different ports
   - Check if ports are already in use
   - Verify network configuration

## 📞 Support

If you encounter issues:
1. Check the console logs
2. Verify environment variables
3. Test database connection
4. Check network connectivity

## 🎯 Next Steps

After successful deployment:
1. Set up monitoring (e.g., Sentry)
2. Configure backups
3. Set up CI/CD pipeline
4. Add SSL certificates
5. Implement rate limiting
