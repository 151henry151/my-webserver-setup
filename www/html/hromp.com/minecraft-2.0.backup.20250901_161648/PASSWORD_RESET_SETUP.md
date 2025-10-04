# Password Reset Setup for Minecraft Clicker

This document explains how to set up and use the password reset functionality for the Minecraft Clicker game.

## Features Added

1. **Email Required for Registration**: Users must now provide an email address when registering
2. **Password Reset via Email**: Users can request password resets through email
3. **Secure Token System**: Time-limited, single-use tokens for password resets
4. **User-Friendly Forms**: Separate pages for forgot password and password reset

## Files Modified/Created

### Backend (Python/Flask)
- `scripts/highscores.py` - Added password reset API endpoints
- `scripts/email_config_example.txt` - Example email configuration

### Frontend (HTML/JavaScript)
- `index.html` - Updated registration form with email field
- `js/script.js` - Updated registration and login logic
- `css/style.css` - Added styles for new form elements
- `forgot-password.html` - New page for requesting password resets
- `reset-password.html` - New page for setting new password

## Setup Instructions

### 1. Email Configuration

The password reset system requires SMTP email configuration. You have several options:

#### Option A: Gmail (Recommended for testing)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" (Google Account → Security → App Passwords)
3. Set environment variables:

```bash
export SMTP_SERVER=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USERNAME=your-email@gmail.com
export SMTP_PASSWORD=your-app-password
export FROM_EMAIL=your-email@gmail.com
```

#### Option B: Custom SMTP Server
Set your own SMTP server details:

```bash
export SMTP_SERVER=your-smtp-server.com
export SMTP_PORT=587
export SMTP_USERNAME=your-username
export SMTP_PASSWORD=your-password
export FROM_EMAIL=noreply@yourdomain.com
```

#### Option C: No Email (Development/Testing)
If you don't configure email credentials, the system will:
- Print reset links to the console instead of sending emails
- Still function for testing purposes

### 2. Database Updates

The system automatically creates the required `password_reset_tokens` table when the Flask app starts.

### 3. Restart the Backend

After setting environment variables, restart the Flask backend:

```bash
cd scripts
python3 highscores.py
```

## How It Works

### 1. User Registration
- Users must provide username, email, and password
- Email is validated and must be unique
- Password is securely hashed with salt

### 2. Password Reset Request
- User visits `/forgot-password.html`
- Enters their email address
- System generates a secure token and sends reset link via email
- Token expires in 1 hour

### 3. Password Reset
- User clicks link in email (goes to `/reset-password.html?token=...`)
- System validates the token
- User enters new password
- Password is updated and token is marked as used

## Security Features

- **Time-limited tokens**: Reset links expire after 1 hour
- **Single-use tokens**: Each token can only be used once
- **Secure tokens**: Uses cryptographically secure random tokens
- **Email validation**: Prevents email enumeration attacks
- **Password requirements**: Minimum 6 characters

## Testing

### Test Registration with Email
1. Go to the game page
2. Click "Register"
3. Fill in username, email, and password
4. Click "Confirm Registration"

### Test Password Reset
1. Go to `/forgot-password.html`
2. Enter a registered email address
3. Check console for reset link (if email not configured)
4. Click the reset link
5. Enter new password

## Troubleshooting

### Email Not Sending
- Check SMTP credentials
- Verify firewall/network settings
- Check console for error messages
- Ensure 2FA is enabled for Gmail

### Token Validation Failing
- Check if token has expired (1 hour limit)
- Verify token hasn't been used already
- Check database connection

### Registration Failing
- Ensure email field is filled
- Check email format validation
- Verify email uniqueness in database

## API Endpoints

- `POST /api/request-password-reset` - Request password reset
- `POST /api/validate-reset-token` - Validate reset token
- `POST /api/reset-password` - Reset password with token

## Future Enhancements

- Email templates with HTML formatting
- Multiple email providers support
- Rate limiting for reset requests
- Audit logging for security events
- Email verification for new registrations 