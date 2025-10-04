# Azalea Art Gallery

A beautiful, responsive art gallery with admin functionality for managing images.

## Features

- **Public Gallery**: Beautiful, responsive grid layout for displaying artwork
- **Admin Interface**: Secure login system for managing the gallery
- **Image Management**: Upload, delete, edit, and reorder images
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Image Optimization**: Automatic image resizing and optimization
- **Modal Viewing**: Click any image to view it in a full-screen modal

## Access

- **Public Gallery**: https://hromp.com/azalea/
- **Admin Panel**: https://hromp.com/azalea/admin/

## Admin Credentials

- **Username**: azalea
- **Password**: gallery2024!

## Technical Details

- **Backend**: Flask API running on port 5002
- **Database**: SQLite for storing image metadata
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Image Storage**: Local filesystem in `/azalea/images/`
- **Authentication**: JWT-based token system

## API Endpoints

- `GET /api/images` - Get all images
- `POST /api/upload` - Upload new image (requires auth)
- `PUT /api/images/{id}` - Update image metadata (requires auth)
- `DELETE /api/images/{id}` - Delete image (requires auth)
- `POST /api/images/{id}/move` - Reorder images (requires auth)
- `POST /api/login` - Admin login
- `GET /api/verify` - Verify authentication token

## File Structure

```
azalea/
├── index.html          # Main gallery page
├── admin/
│   └── index.html      # Admin interface
├── api/
│   └── app.py          # Flask API server
├── images/             # Uploaded images directory
└── README.md           # This file
```

## Service Management

The gallery API runs as a systemd service:

```bash
# Check status
sudo systemctl status azalea-gallery

# Start/stop/restart
sudo systemctl start azalea-gallery
sudo systemctl stop azalea-gallery
sudo systemctl restart azalea-gallery

# View logs
sudo journalctl -u azalea-gallery -f
```

## Security Notes

- Change the default admin password in production
- Update the JWT secret key in the Flask app
- Consider adding rate limiting for uploads
- Regular backups of the SQLite database and images

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)
