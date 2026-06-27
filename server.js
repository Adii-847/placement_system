const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mockData = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('layout', 'partials/layout'); // Default layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Locals for views (can be accessed in any view)
app.use((req, res, next) => {
  res.locals.COMPANIES = mockData.COMPANIES;
  res.locals.NOTIFICATIONS = mockData.NOTIFICATIONS;
  res.locals.APP_STATUS = mockData.APP_STATUS;
  res.locals.AI_CHAT_INIT = mockData.AI_CHAT_INIT;
  res.locals.AI_RESPONSES = mockData.AI_RESPONSES;
  
  // Set default role based on path, defaulting to student
  res.locals.role = req.path.startsWith('/coordinator') ? 'coordinator' : 'student';
  res.locals.path = req.path;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('landing', { layout: false }); // landing page doesn't use standard dashboard layout
});

// Student Routes
app.get('/student/dashboard', (req, res) => res.render('student/dashboard', { title: 'Dashboard', subtitle: 'Overview' }));
app.get('/student/drives', (req, res) => res.render('pages/drives', { title: 'Placement Drives', subtitle: 'Browse & apply' }));
app.get('/student/applications', (req, res) => res.render('pages/applications', { title: 'My Applications', subtitle: 'Track your journey' }));
app.get('/student/resume', (req, res) => res.render('pages/resume', { title: 'AI Resume Analyzer', subtitle: 'Improve your resume' }));
app.get('/student/ai', (req, res) => res.render('pages/ai', { title: 'AI Career Assistant', subtitle: 'Personalized guidance' }));
app.get('/student/interview', (req, res) => res.render('pages/interview', { title: 'Interview Prep', subtitle: 'Practice & improve' }));
app.get('/student/notifications', (req, res) => res.render('pages/notifications', { title: 'Notifications', subtitle: 'Stay updated' }));
app.get('/student/analytics', (req, res) => res.render('pages/analytics', { title: 'Analytics', subtitle: 'Placement insights' }));

// Coordinator Routes
app.get('/coordinator/dashboard', (req, res) => res.render('coordinator/dashboard', { title: 'Dashboard', subtitle: 'Overview' }));
app.get('/coordinator/drives', (req, res) => res.render('pages/drives', { title: 'Placement Drives', subtitle: 'Manage drives' }));
app.get('/coordinator/applications', (req, res) => res.render('pages/applications', { title: 'Applicants', subtitle: 'Track applications' }));
app.get('/coordinator/analytics', (req, res) => res.render('pages/analytics', { title: 'Analytics', subtitle: 'Overall insights' }));
app.get('/coordinator/notifications', (req, res) => res.render('pages/notifications', { title: 'Announcements', subtitle: 'Manage announcements' }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
