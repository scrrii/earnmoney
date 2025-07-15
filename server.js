const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'earnmoney-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Database setup
const db = new sqlite3.Database('earnmoney.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS withdrawals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        fullname TEXT NOT NULL,
        email TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        payment_details TEXT NOT NULL,
        points_withdrawn INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
    }
});

// Routes
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    }
});

app.get('/watch-ad', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'watch-ad.html'));
    }
});

app.get('/visit-link', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'visit-link.html'));
    }
});

app.get('/link-video', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'link-video.html'));
    }
});

app.get('/withdraw', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'withdraw.html'));
    }
});

// API Routes
app.post('/api/register', async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)', 
            [fullname, email, hashedPassword], function(err) {
            if (err) {
                res.json({ success: false, message: 'Email already exists' });
            } else {
                res.json({ success: true, message: 'Registration successful' });
            }
        });
    } catch (error) {
        res.json({ success: false, message: 'Registration failed' });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err || !user) {
            res.json({ success: false, message: 'Invalid credentials' });
            return;
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            req.session.userId = user.id;
            req.session.userFullname = user.fullname;
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.get('/api/user', (req, res) => {
    if (!req.session.userId) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }
    
    db.get('SELECT fullname, email, points FROM users WHERE id = ?', [req.session.userId], (err, user) => {
        if (err || !user) {
            res.json({ success: false, message: 'User not found' });
        } else {
            res.json({ success: true, user });
        }
    });
});

app.post('/api/earn-points', (req, res) => {
    if (!req.session.userId) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }
    
    const { points, type } = req.body;
    
    db.run('UPDATE users SET points = points + ? WHERE id = ?', [points, req.session.userId], (err) => {
        if (err) {
            res.json({ success: false, message: 'Failed to add points' });
        } else {
            res.json({ success: true, message: `Earned ${points} points!` });
        }
    });
});

app.post('/api/withdraw', (req, res) => {
    if (!req.session.userId) {
        res.json({ success: false, message: 'Not logged in' });
        return;
    }
    
    const { fullname, email, paymentMethod, paymentDetails } = req.body;
    
    // Check if user has enough points
    db.get('SELECT points FROM users WHERE id = ?', [req.session.userId], (err, user) => {
        if (err || !user) {
            res.json({ success: false, message: 'User not found' });
            return;
        }
        
        if (user.points < 10000) {
            res.json({ success: false, message: 'Insufficient points. Need 10,000 points to withdraw.' });
            return;
        }
        
        // Create withdrawal request
        db.run('INSERT INTO withdrawals (user_id, fullname, email, payment_method, payment_details, points_withdrawn) VALUES (?, ?, ?, ?, ?, ?)',
            [req.session.userId, fullname, email, paymentMethod, paymentDetails, 10000], function(err) {
            if (err) {
                res.json({ success: false, message: 'Failed to create withdrawal request' });
                return;
            }
            
            // Deduct points
            db.run('UPDATE users SET points = points - 10000 WHERE id = ?', [req.session.userId], (err) => {
                if (err) {
                    res.json({ success: false, message: 'Failed to deduct points' });
                    return;
                }
                
                // Send email to admin
                const mailOptions = {
                    from: 'your-email@gmail.com',
                    to: 'admin@earnmoney.com', // Replace with admin email
                    subject: 'New Withdrawal Request',
                    text: `New withdrawal request:\n\nUser: ${fullname}\nEmail: ${email}\nPayment Method: ${paymentMethod}\nPayment Details: ${paymentDetails}\nAmount: $1 USD (10,000 points)`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Email error:', error);
                    }
                });
                
                res.json({ success: true, message: 'Withdrawal request submitted successfully!' });
            });
        });
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true, message: 'Logged out successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});