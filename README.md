# DNX Settings Application

A full-stack MERN application for managing user settings with both web and mobile responsive designs. This application allows users to manage their general preferences and notification settings.

## Features

- **User Authentication**: Register and login functionality
- **Settings Management**: 
  - General settings (Language, Timezone, Time Format)
  - Notification preferences (Message, Task Update, Task Deadline, Mentor Help)
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Clean and intuitive interface matching the provided designs
- **Real-time Updates**: Settings are saved and updated in real-time

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

Create a `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dnx-settings
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 5. Run the application

#### Development Mode (Both frontend and backend)
```bash
npm run dev
```

#### Or run separately:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PUT /api/settings` - Update user settings (protected)

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Navigate to Settings**: Click on "Settings" in the sidebar navigation
3. **General Settings**: 
   - Select your preferred language
   - Choose timezone location
   - Set time format (12/24 hours)
4. **Notification Settings**:
   - Toggle notification preferences on/off
   - Customize which notifications you want to receive
5. **Save Changes**: Click "Save Changes" to persist your settings

## Mobile Responsive Design

The application is fully responsive and includes:
- Mobile hamburger menu for navigation
- Touch-friendly interface elements
- Optimized layouts for different screen sizes
- Collapsible sidebar on mobile devices

## Features Implemented

### ✅ Completed
- [x] User authentication (register/login)
- [x] Settings management (General & Notifications)
- [x] Responsive design (web & mobile)
- [x] Navigation sidebar with mobile menu
- [x] Real-time settings updates
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Modern UI matching design mockups

### 🔄 Future Enhancements
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Profile picture upload
- [ ] Advanced notification scheduling
- [ ] Settings export/import
- [ ] Multi-language support
- [ ] Push notifications

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




