# Minecraft Clicker Game

A Minecraft-themed incremental clicker game where players mine blocks, upgrade their tools, and build an automated mining operation. Created by **Lucas Henry Bishop**.

## 🎮 Game Overview

Minecraft Clicker is an idle/clicker game that combines the charm of Minecraft with addictive incremental gameplay mechanics. Players start with basic wooden tools and progress through increasingly powerful mining equipment, from stone pickaxes to quantum miners.

### Key Features
- **Progressive Tool Upgrades**: Wooden → Stone → Iron → Diamond → Netherite → Mining Robot → Automated Mine → Quantum Miner
- **Automated Mining**: Tools provide passive block generation per second
- **Achievement System**: Unlock achievements for milestones and progress
- **Save/Load System**: Persistent game state with local storage
- **Statistics Tracking**: Monitor your mining progress and efficiency
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

### Frontend Technologies
- **HTML5**: Semantic markup and game structure
- **CSS3**: Modern styling with flexbox/grid layouts and animations
- **Vanilla JavaScript**: No frameworks - pure ES6+ for optimal performance
- **Local Storage**: Client-side save/load functionality

### Game Mechanics
- **Click-based Mining**: Manual clicking generates blocks
- **Upgrade System**: Purchase better tools for increased efficiency
- **Passive Income**: Tools generate blocks automatically over time
- **Achievement System**: Milestone-based rewards and progression
- **Economy Balance**: Carefully tuned progression and pricing

### File Structure
```
minecraft-clicker/
├── index.html          # Main game interface
├── style.css           # Game styling and animations
├── script.js           # Core game logic and mechanics
├── assets/             # Game images and resources
│   ├── grassblock.jpeg
│   ├── woodpickaxe.jpeg
│   ├── stonepicaxe.png
│   ├── ironpickaxe.jpg
│   └── ...
└── README.md           # This file
```

## 🚀 Deployment

### Standard Nginx Web Server Deployment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/151henry151/minecraft-clicker.git
   cd minecraft-clicker
   ```

2. **Configure Nginx**
   Create or edit your nginx configuration file (e.g., `/etc/nginx/sites-available/minecraft-clicker`):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       root /path/to/minecraft-clicker;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # Cache static assets
       location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

3. **Enable the Site**
   ```bash
   # Create symlink
   sudo ln -s /etc/nginx/sites-available/minecraft-clicker /etc/nginx/sites-enabled/
   
   # Test configuration
   sudo nginx -t
   
   # Reload nginx
   sudo systemctl reload nginx
   ```

4. **Set Permissions**
   ```bash
   sudo chown -R www-data:www-data /path/to/minecraft-clicker
   sudo chmod -R 755 /path/to/minecraft-clicker
   ```

### Alternative: Simple HTTP Server (Development)
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 🎯 Game Features

### Mining Tools Progression
1. **Wooden Pickaxe** - Basic mining tool
2. **Stone Pickaxe** - Improved efficiency
3. **Iron Pickaxe** - Significant upgrade
4. **Diamond Pickaxe** - High-end mining
5. **Netherite Pickaxe** - Premium tool
6. **Mining Robot** - Automated mining
7. **Automated Mine** - Industrial scale
8. **Quantum Miner** - Ultimate mining technology

### Achievement System
- **First Steps**: Mine your first block
- **Tool Collector**: Own multiple pickaxe types
- **Automation Expert**: Deploy mining robots
- **Block Master**: Reach high block counts
- **Speed Demon**: Achieve high mining rates

### Statistics Tracking
- Total blocks mined
- Total clicks performed
- Upgrades purchased
- Play time tracking
- Mining efficiency metrics

## 🛠️ Development

### Local Development Setup
1. Clone the repository
2. Open `index.html` in a web browser
3. Use browser dev tools for debugging
4. Local storage saves automatically

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Considerations
- Optimized for 60fps gameplay
- Efficient DOM manipulation
- Minimal memory footprint
- Responsive design for all screen sizes

## 📱 Mobile Support

The game is fully responsive and works on mobile devices:
- Touch-friendly click areas
- Optimized UI for small screens
- Swipe gestures for navigation
- Mobile-optimized performance

## 🔧 Customization

### Modifying Game Balance
Edit `script.js` to adjust:
- Tool costs and efficiency
- Achievement requirements
- Game progression speed
- Visual effects and animations

### Adding New Features
- New mining tools
- Additional achievements
- Special events or bonuses
- Multiplayer features (requires backend)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Please respect the original creator, Lucas Henry Bishop.

## 👨‍💻 Credits

**Created by:** Lucas Henry Bishop

**GitHub Repository:** https://github.com/151henry151/minecraft-clicker

**Live Demo:** https://hromp.com/minecraft-2.0/

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📞 Support

For questions or support, please open an issue on the GitHub repository.

---

*Enjoy mining! ⛏️* 