# Alice Poulain Café - Premium Website with Admin Dashboard

A beautiful, fully-functional website for a Parisian-style café in Austin with an advanced admin dashboard for owner management.

## 🎯 Features

### Public Website
- ✨ Premium, responsive design with elegant Parisian aesthetic
- 📱 Mobile-friendly interface
- 🎨 Custom color scheme and typography
- 📌 Dynamic offers & notices section
- 📝 Table reservation system with email notifications
- 📧 Newsletter subscription for customers
- ⭐ Customer testimonials
- 🎪 Full menu showcase
- 📞 Contact information & location

### Admin Dashboard (Owner Portal)
- 🔐 Secure login system
- 📊 Management tabs for:
  - **Offers & Notices**: Create, edit, delete offers without developer help
  - **Newsletter**: Send campaigns to all subscribers with one click
  - **Reservations**: View and manage table bookings
  - **Subscribers**: See all newsletter subscribers
- 📈 Real-time stats and analytics
- 💾 Database persistence

### Email Notifications
- ✉️ Automatic reservation confirmation emails to customers
- ✉️ Owner notifications for new reservations
- 📮 Newsletter campaigns to subscribers
- 🎉 Beautiful HTML email templates

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn
- Gmail account (for email notifications)

### Installation

1. **Navigate to project directory**
```bash
cd "alice pouline cafe"
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Edit `.env` file with your settings:
```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Gmail Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Owner Login Credentials (CHANGE THESE!)
OWNER_EMAIL=owner@alicepoulain.cafe
OWNER_PASSWORD=SecurePassword123!
```

### Gmail Setup (Required for Email Notifications)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste it in `.env` as `EMAIL_PASSWORD`

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run at `http://localhost:3000`

---

## 📖 Usage

### Public Website
- Visit `http://localhost:3000` 
- Browse menu, view offers, subscribe to newsletter
- Submit reservations (you'll receive email notifications)

### Admin Dashboard
1. Click "Owner Portal" in navbar or visit `http://localhost:3000/login.html`
2. Login with credentials from `.env`
3. Dashboard tabs:
   - **Offers**: Add/edit/delete offers - changes appear instantly on website
   - **Newsletter**: Send campaigns to all subscribers
   - **Reservations**: View pending reservations and change status
   - **Subscribers**: See who's subscribed

---

## 📁 Project Structure

```
alice pouline cafe/
├── index.html              # Main website
├── login.html              # Owner login page
├── admin.html              # Owner dashboard
├── server.js               # Express server & API
├── database.js             # SQLite setup
├── email.js                # Email configurations
├── package.json            # Dependencies
├── .env                    # Environment variables
├── cafe.db                 # SQLite database (auto-created)
└── README.md              # This file
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Owner login

### Offers
- `GET /api/offers` - Get all offers
- `POST /api/offers` - Create new offer (requires auth)
- `PUT /api/offers/:id` - Update offer (requires auth)
- `DELETE /api/offers/:id` - Delete offer (requires auth)

### Reservations
- `POST /api/reservations` - Submit reservation
- `GET /api/reservations` - Get all reservations (requires auth)
- `PUT /api/reservations/:id/status` - Update status (requires auth)

### Newsletter
- `POST /api/subscribers` - Subscribe to newsletter
- `GET /api/subscribers` - Get all subscribers (requires auth)
- `POST /api/newsletter/send` - Send newsletter (requires auth)

---

## 🎨 Customization

### Colors
Edit `:root` variables in HTML files:
```css
--bg-primary: #fcf6ec;      /* Background */
--bg-card: #f3ede2;         /* Card background */
--text-primary: #2e2521;    /* Text color */
--btn-primary: #a82e2e;     /* Primary button */
--highlight: #b2a28b;       /* Accent color */
```

### Fonts
- **Headings**: Libre Baskerville (serif, elegant)
- **Body**: Inter (sans-serif, modern)

### Owner Login
Change in `.env`:
```env
OWNER_EMAIL=your-email@example.com
OWNER_PASSWORD=YourNewPassword123!
```

---

## 📧 Email Configuration

### Email Templates Include:
✅ Reservation confirmation to customer  
✅ Owner notification for new reservations  
✅ Newsletter campaigns with branding  

### Troubleshooting Emails:
1. Check `.env` credentials
2. Verify Gmail app password (not regular password)
3. Check spam folder
4. Look at server console for error messages

---

## 🔒 Security Notes

⚠️ **Before going live:**
1. Change `OWNER_PASSWORD` in `.env`
2. Change `JWT_SECRET` to a long random string
3. Use HTTPS in production
4. Never commit `.env` to git
5. Use environment variables on hosting platform

---

## 📱 Responsive Design

✅ Desktop (1920px and above)  
✅ Tablet (768px - 1024px)  
✅ Mobile (320px - 767px)  

All pages are fully responsive with optimized layouts for each device.

---

## 🎓 How to Use (For Owner)

### Adding an Offer
1. Login to Admin Dashboard
2. Click "Offers & Notices" tab
3. Click "+ Add New Offer"
4. Fill in title, description, and valid until date
5. Click "Save Offer" - appears instantly on website!

### Sending Newsletter
1. Go to "Newsletter" tab
2. Write subject line and message
3. See subscriber count
4. Click "Send to All Subscribers"
5. All subscribers receive email!

### Managing Reservations
1. Go to "Reservations" tab
2. See all bookings
3. Change status (Pending → Confirmed → Cancelled)
4. Click to view details

---

## 📞 Support

For issues:
1. Check server console for errors
2. Verify `.env` configuration
3. Ensure all files are in correct directory
4. Restart server after changes

---

## 📄 License

This website is designed for Alice Poulain Café, Austin TX.

---

**Built with ❤️ for Alice Poulain Café**

Last Updated: May 2026
