# SpaceMail Email Configuration Setup

## ✅ Email Configuration Complete

Your Minecraft Clicker password reset system is now configured to use your SpaceMail email account.

## 🔧 Current Configuration

- **SMTP Server**: `mail.spacemail.com`
- **SMTP Port**: `465` (SSL)
- **Username**: `minecraftclicker@hromp.com`
- **Security**: SSL encryption
- **From Email**: `minecraftclicker@hromp.com`

## 📁 Configuration Files

### 1. Main Configuration (`email_config.txt`)
This file contains your actual email credentials and is loaded by the application:

```
SMTP_SERVER=mail.spacemail.com
SMTP_PORT=465
SMTP_USERNAME=minecraftclicker@hromp.com
SMTP_PASSWORD=8*ozxS78
FROM_EMAIL=minecraftclicker@hromp.com
```

### 2. Template File (`email_config_example.txt`)
This is a template showing the required format without actual credentials.

### 3. Configuration Module (`config.py`)
A Python module that loads the configuration file and provides fallback to environment variables.

## 🚀 How It Works

1. **Application Startup**: The backend loads email configuration from `email_config.txt`
2. **Password Reset Request**: User requests password reset via email
3. **Email Generation**: System creates reset link and sends via SpaceMail SMTP
4. **User Receives**: User gets email with password reset link
5. **Password Reset**: User clicks link and sets new password

## 🛡️ Security Features

- **SSL Encryption**: All email communication uses SSL (port 465)
- **Secure Tokens**: Password reset tokens are cryptographically secure
- **Time Limited**: Reset links expire after 1 hour
- **Single Use**: Each token can only be used once
- **No Credential Exposure**: Credentials are not hardcoded in source code

## 🔄 Updating Configuration

### Option 1: Edit Config File
1. Edit `scripts/email_config.txt`
2. Update the values as needed
3. Restart the backend service

### Option 2: Environment Variables
Set these environment variables to override the config file:

```bash
export SMTP_SERVER=mail.spacemail.com
export SMTP_PORT=465
export SMTP_USERNAME=minecraftclicker@hromp.com
export SMTP_PASSWORD=your-new-password
export FROM_EMAIL=minecraftclicker@hromp.com
```

## 🧪 Testing

The system has been tested and verified working:
- ✅ Configuration loading
- ✅ SMTP connection (SpaceMail)
- ✅ Password reset request API
- ✅ Email sending functionality

## 🚨 Important Notes

### Version Control
- `email_config.txt` is in `.gitignore` to prevent credential exposure
- Never commit actual credentials to version control
- Use the template file for documentation

### Password Changes
If you change your SpaceMail password:
1. Update `email_config.txt`
2. Restart the backend service
3. Test with a password reset request

### Backup
Keep a secure backup of your email configuration:
- Store credentials in a password manager
- Document the setup process
- Keep the template file updated

## 🆘 Troubleshooting

### Email Not Sending
1. Check SpaceMail credentials in `email_config.txt`
2. Verify SMTP server and port settings
3. Check backend logs for error messages
4. Ensure SpaceMail account is active

### Configuration Issues
1. Verify `email_config.txt` format (no spaces around `=`)
2. Check file permissions
3. Restart backend after configuration changes
4. Check console output for configuration loading messages

### SSL Issues
- Port 465 requires SSL (already configured)
- If switching to port 587, update to use STARTTLS instead

## 📞 Support

If you encounter issues:
1. Check the backend logs (`nohup.out`)
2. Verify SpaceMail account status
3. Test SMTP connection manually if needed
4. Review the main setup guide in `PASSWORD_RESET_SETUP.md`

---

**Status**: ✅ Configured and Working  
**Last Updated**: $(date)  
**Email Provider**: SpaceMail  
**Security**: SSL (Port 465) 