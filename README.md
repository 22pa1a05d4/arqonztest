# MERN Stack Task Management Application

A comprehensive full-stack MERN application featuring user authentication, task management, and settings with both web and mobile responsive designs. This application allows users to manage tasks, track progress, and customize their preferences.

## Features

- **User Authentication**: Register and login functionality with JWT
- **Task Management**: 
  - View task lists with progress tracking
  - Detailed task views with video content
  - Task categorization and filtering
  - Student assignment tracking
- **Settings Management**: 
  - General settings (Language, Timezone, Time Format)
  - Notification preferences (Message, Task Update, Task Deadline, Mentor Help)
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Clean and intuitive interface with professional design
- **Real-time Updates**: Settings and tasks are saved and updated in real-time
- **Port Forwarding**: Support for mobile testing and remote access
- **MongoDB Atlas**: Cloud database integration

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React.js** with functional components and hooks
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for icons
- **CSS3** with responsive design

## Project Structure

```
dnx-settings-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── settings.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Register.js
│   │   │   │   └── Auth.css
│   │   │   ├── Dashboard.js
│   │   │   ├── Layout.js
│   │   │   └── Settings.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd dnx-settings-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Environment Setup

#### Option 1: Quick Setup with Atlas
```bash
# Run the interactive setup script
node setup-atlas.js
```

#### Option 2: Manual Setup

Create a `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dnx-settings?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

Create a `.env` file in the frontend directory:
```bash
cd frontend
cp .env.example .env
```

Edit the frontend `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### For MongoDB Atlas (Recommended):
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update your `.env` file with the Atlas connection string

#### For Local MongoDB:
```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 5. Seed Sample Data
```bash
cd backend
npm run seed
```

### 6. Run the application

#### Development Mode (Both frontend and backend)
```bash
npm run dev
```

#### Or run separately:

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm start
```

#### For Port Forwarding (Mobile Testing):
```bash
# Backend with port forwarding
cd backend
npm run dev:forward

# In another terminal, use ngrok for public access
npm install -g ngrok
ngrok http 5000

# Update frontend .env with ngrok URL
REACT_APP_API_URL=https://your-ngrok-url.ngrok.io/api
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Public URL (with ngrok): https://your-ngrok-url.ngrok.io

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PUT /api/settings` - Update user settings (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get specific task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View your main dashboard after login
3. **Task Management**: 
   - Browse tasks in the task list
   - View detailed task information
   - Track progress and assignments
4. **Settings**: 
   - General settings (Language, Timezone, Time Format)
   - Notification preferences
   - Save your preferences
5. **Profile**: Access your profile and logout from the header dropdown

## Mobile Responsive Design

The application is fully responsive and includes:
- Mobile hamburger menu for navigation
- Touch-friendly interface elements
- Optimized layouts for different screen sizes
- Collapsible sidebar on mobile devices

## Features Implemented

### ✅ Completed
- [x] User authentication (register/login) with JWT
- [x] Task management system with CRUD operations
- [x] Settings management (General & Notifications)
- [x] Responsive design (web & mobile)
- [x] Navigation sidebar with mobile menu
- [x] Profile dropdown with logout functionality
- [x] Real-time settings and task updates
- [x] Form validation and error handling
- [x] Loading states and user feedback
- [x] Modern UI with professional design
- [x] MongoDB Atlas integration
- [x] Port forwarding for mobile testing
- [x] Environment configuration
- [x] Sample data seeding

### 🔄 Future Enhancements
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Profile picture upload
- [ ] Advanced notification scheduling
- [ ] Settings export/import
- [ ] Multi-language support
- [ ] Push notifications

## Deployment

### Quick Deployment Options

#### 1. Heroku Deployment
```bash
# Backend
heroku create your-app-backend
heroku config:set MONGODB_URI=your_atlas_connection_string
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main

# Frontend
heroku create your-app-frontend
heroku buildpacks:set mars/create-react-app
heroku config:set REACT_APP_API_URL=https://your-backend-app.herokuapp.com/api
git push heroku main
```

#### 2. Vercel + Railway
- **Frontend**: Deploy to Vercel with environment variables
- **Backend**: Deploy to Railway with MongoDB Atlas connection

#### 3. Netlify + Render
- **Frontend**: Deploy to Netlify
- **Backend**: Deploy to Render with environment variables

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Port Forwarding & Mobile Testing

### Using ngrok (Recommended)
```bash
# Install ngrok
npm install -g ngrok

# Start backend
cd backend && npm run dev

# In another terminal
ngrok http 5000

# Use the provided URL for mobile testing
```

### Using localtunnel
```bash
# Install localtunnel
npm install -g localtunnel

# Start backend
cd backend && npm run dev

# In another terminal
lt --port 5000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please contact us through the Help Center in the application or create an issue in the repository.




