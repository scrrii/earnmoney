# EarnMoney Website - Watch Ads & Earn Points

A complete web application where users can earn money by watching advertisements and visiting shortened links.

## Features

### 🔐 User Authentication
- User registration with full name, email, and password
- Secure login system with password hashing
- Session management

### 📊 Dashboard
- Welcome message with user's name
- Real-time points display
- Quick access to earning activities
- Withdrawal button (enabled when user has 10,000+ points)

### 🎥 Watch Ad Videos
- 30-second video advertisements
- Earn 40 points per video
- Timer countdown system
- Confirmation button after video completion

### 🔗 Visit Shortened Links
- Simulated shortened link service (Ouo.io style)
- Two-step earning process:
  1. Visit link (25 points)
  2. Watch bonus video (40 points)
- Total: 65 points per complete action

### 💰 Withdrawal System
- Minimum withdrawal: 10,000 points = $1 USD
- Multiple payment methods: PayPal, Paysera, Binance, Bank Transfer
- Admin email notification system
- Automatic points deduction upon withdrawal request

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: SQLite3
- **Authentication**: bcryptjs for password hashing
- **Sessions**: express-session
- **Email**: nodemailer
- **Frontend**: HTML5, CSS3, JavaScript

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Configure email settings in `server.js`:
```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
    }
});
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Points System

| Action | Points Earned |
|--------|---------------|
| Watch Ad Video | 40 Points |
| Visit Shortened Link | 25 Points |
| Watch Ad after Link | 40 Points |
| **Total (Link + Ad)** | **65 Points** |
| **Withdrawal Threshold** | **10,000 Points = $1 USD** |

## File Structure

```
earnmoney/
├── server.js              # Main server file
├── package.json           # Dependencies
├── earnmoney.db          # SQLite database (auto-created)
└── public/
    ├── index.html         # Login/Register page
    ├── dashboard.html     # User dashboard
    ├── watch-ad.html      # Video watching page
    ├── visit-link.html    # Link redirect page
    ├── link-video.html    # Bonus video page
    ├── withdraw.html      # Withdrawal form
    ├── styles.css         # Main stylesheet
    └── script.js          # Frontend JavaScript
```

## Database Schema

### Users Table
- `id` (Primary Key)
- `fullname`
- `email` (Unique)
- `password` (Hashed)
- `points` (Default: 0)
- `created_at`

### Withdrawals Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `fullname`
- `email`
- `payment_method`
- `payment_details`
- `points_withdrawn`
- `status` (Default: 'pending')
- `created_at`

## Revenue Model

### For Users:
- Watch 30-second video ads
- Visit shortened links with ads
- Accumulate points for real money

### For Admin:
- Earn from video ad networks (CPM/CPV)
- Earn from shortened link services (CPC)
- Manual withdrawal processing

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- SQL injection protection
- Input validation
- Secure withdrawal process

## Future Enhancements

- Real video ad integration
- Actual shortened link service integration
- Automated payment processing
- Referral system
- Mobile app
- Admin dashboard
- Analytics and reporting

## License

MIT License - Feel free to modify and use for your projects.