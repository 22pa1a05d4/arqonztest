const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config();

const sampleTasks = [
  {
    title: "Creating Awesome Mobile Apps",
    description: "Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    videoTitle: "The Most Engaging Mobile Apps",
    videoDuration: "10:00",
    category: "UI UX Design",
    subcategory: "Apps Design",
    studentsInvolved: 200,
    duration: "1 Hour",
    assessmentPoints: [
      { point: "Understanding the tools in Figma", completed: true },
      { point: "Understand the basics of making designs", completed: true },
      { point: "Designing a mobile application using figma", completed: true },
      { point: "Presenting the design flow", completed: true }
    ],
    assignedAssignments: [
      {
        title: "Creating Awesome Mobile Apps",
        category: "UI UX Design . Apps Design"
      }
    ],
    studentInfo: {
      name: "Dennis Nzioki",
      class: "MIPA 2",
      number: "10"
    },
    status: "in_progress"
  },
  {
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript. Build responsive websites and understand modern web development practices. This comprehensive course covers everything from basic syntax to advanced concepts.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Complete Web Development Course",
    videoDuration: "15:30",
    category: "Web Development",
    subcategory: "Frontend",
    studentsInvolved: 150,
    duration: "2 Hours",
    assessmentPoints: [
      { point: "Understanding HTML structure", completed: false },
      { point: "CSS styling and layout", completed: false },
      { point: "JavaScript fundamentals", completed: false },
      { point: "Responsive design principles", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Build a Portfolio Website",
        category: "Web Development . Frontend"
      }
    ],
    studentInfo: {
      name: "Sarah Johnson",
      class: "CS 101",
      number: "25"
    },
    status: "pending"
  },
  {
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning using Python. Learn pandas, numpy, matplotlib, and scikit-learn to solve real-world data problems.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Python for Data Science",
    videoDuration: "20:45",
    category: "Data Science",
    subcategory: "Python",
    studentsInvolved: 300,
    duration: "3 Hours",
    assessmentPoints: [
      { point: "Data manipulation with pandas", completed: true },
      { point: "Data visualization techniques", completed: true },
      { point: "Machine learning basics", completed: false },
      { point: "Statistical analysis", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Analyze Sales Data",
        category: "Data Science . Python"
      }
    ],
    studentInfo: {
      name: "Michael Chen",
      class: "DS 201",
      number: "15"
    },
    status: "completed"
  },
  {
    title: "Creating Fresh Website",
    description: "Build modern, responsive websites from scratch. Learn HTML5, CSS3, JavaScript, and modern frameworks. Create beautiful user interfaces and interactive web applications.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Modern Web Development",
    videoDuration: "12:30",
    category: "Web Development",
    subcategory: "Frontend",
    studentsInvolved: 180,
    duration: "2 Hours",
    assessmentPoints: [
      { point: "HTML5 semantic structure", completed: true },
      { point: "CSS3 styling and animations", completed: true },
      { point: "JavaScript fundamentals", completed: false },
      { point: "Responsive design principles", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Build a Portfolio Website",
        category: "Web Development . Frontend"
      }
    ],
    studentInfo: {
      name: "Emily Rodriguez",
      class: "WD 101",
      number: "22"
    },
    status: "in_progress"
  },
  {
    title: "Creating Color Palettes",
    description: "Master the art of color theory and create stunning color palettes for digital designs. Learn about color harmony, contrast, and accessibility in design.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Color Theory Masterclass",
    videoDuration: "8:15",
    category: "UI UX Design",
    subcategory: "Color Theory",
    studentsInvolved: 120,
    duration: "1.5 Hours",
    assessmentPoints: [
      { point: "Understanding color theory", completed: true },
      { point: "Creating harmonious palettes", completed: true },
      { point: "Color accessibility guidelines", completed: true },
      { point: "Implementing colors in design", completed: true }
    ],
    assignedAssignments: [
      {
        title: "Design Brand Color Palette",
        category: "UI UX Design . Color Theory"
      }
    ],
    studentInfo: {
      name: "Alex Thompson",
      class: "UX 301",
      number: "8"
    },
    status: "completed"
  },
  {
    title: "Creating Mobile App Design",
    description: "Design intuitive and beautiful mobile applications. Learn mobile-first design principles, user experience patterns, and modern mobile design trends.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Mobile App Design Fundamentals",
    videoDuration: "15:20",
    category: "UI UX Design",
    subcategory: "Mobile Design",
    studentsInvolved: 250,
    duration: "2.5 Hours",
    assessmentPoints: [
      { point: "Mobile design principles", completed: true },
      { point: "User interface patterns", completed: false },
      { point: "Prototyping mobile apps", completed: false },
      { point: "User testing and feedback", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Design a Mobile Banking App",
        category: "UI UX Design . Mobile Design"
      }
    ],
    studentInfo: {
      name: "Sarah Kim",
      class: "MD 201",
      number: "12"
    },
    status: "pending"
  },
  {
    title: "Creating Perfect Website",
    description: "Build the perfect website with modern technologies. Learn advanced CSS techniques, JavaScript frameworks, and performance optimization.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Advanced Web Development",
    videoDuration: "18:45",
    category: "Web Development",
    subcategory: "Full Stack",
    studentsInvolved: 200,
    duration: "3 Hours",
    assessmentPoints: [
      { point: "Advanced CSS techniques", completed: false },
      { point: "JavaScript frameworks", completed: false },
      { point: "Performance optimization", completed: false },
      { point: "SEO and accessibility", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Build an E-commerce Website",
        category: "Web Development . Full Stack"
      }
    ],
    studentInfo: {
      name: "David Wilson",
      class: "FS 301",
      number: "18"
    },
    status: "pending"
  },
  {
    title: "Mobile App Design",
    description: "Create stunning mobile app interfaces with modern design tools. Learn about mobile UX patterns, navigation design, and user-centered design principles.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Mobile UX Design Patterns",
    videoDuration: "14:30",
    category: "UI UX Design",
    subcategory: "Mobile UX",
    studentsInvolved: 160,
    duration: "2 Hours",
    assessmentPoints: [
      { point: "Mobile UX patterns", completed: true },
      { point: "Navigation design", completed: false },
      { point: "User-centered design", completed: false },
      { point: "Design system creation", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Design a Social Media App",
        category: "UI UX Design . Mobile UX"
      }
    ],
    studentInfo: {
      name: "Lisa Park",
      class: "UX 201",
      number: "25"
    },
    status: "pending"
  },
  {
    title: "Creating Android Apps",
    description: "Develop native Android applications using Kotlin and modern Android development practices. Learn about Android architecture, UI components, and app deployment.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Android Development with Kotlin",
    videoDuration: "22:15",
    category: "Mobile Development",
    subcategory: "Android",
    studentsInvolved: 180,
    duration: "4 Hours",
    assessmentPoints: [
      { point: "Kotlin programming basics", completed: false },
      { point: "Android UI components", completed: false },
      { point: "App architecture patterns", completed: false },
      { point: "App store deployment", completed: false }
    ],
    assignedAssignments: [
      {
        title: "Build a Weather App",
        category: "Mobile Development . Android"
      }
    ],
    studentInfo: {
      name: "James Miller",
      class: "AD 301",
      number: "14"
    },
    status: "pending"
  }
];

const seedTasks = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dnx-settings');
    console.log('Connected to MongoDB');

    // Get a user ID from existing users
    const User = require('./models/User');
    const user = await User.findOne();
    
    if (!user) {
      console.log('No users found. Please create a user first.');
      process.exit(1);
    }

    // Add createdBy field to all tasks
    const tasksWithCreator = sampleTasks.map(task => ({
      ...task,
      createdBy: user._id
    }));

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert sample tasks
    const createdTasks = await Task.insertMany(tasksWithCreator);
    console.log(`Created ${createdTasks.length} sample tasks`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding tasks:', error);
    process.exit(1);
  }
};

// Run the seed function
seedTasks();
