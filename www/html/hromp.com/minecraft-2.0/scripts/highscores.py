#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os
import json
from datetime import datetime, timedelta
import secrets
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Import configuration
try:
    from config import get_email_config
    email_config = get_email_config()
    SMTP_SERVER = email_config['SMTP_SERVER']
    SMTP_PORT = email_config['SMTP_PORT']
    SMTP_USERNAME = email_config['SMTP_USERNAME']
    SMTP_PASSWORD = email_config['SMTP_PASSWORD']
    FROM_EMAIL = email_config['FROM_EMAIL']
except ImportError:
    # Fallback to environment variables if config module not available
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'mail.spacemail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '465'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    FROM_EMAIL = os.getenv('FROM_EMAIL', 'minecraftclicker@hromp.com')

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Database setup
DB_PATH = '../highscores.db'

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table for username/password authentication with profile fields
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            email TEXT,
            profile_picture TEXT DEFAULT 'default.svg',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # High scores table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS high_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            username TEXT NOT NULL,
            blocks INTEGER NOT NULL,
            total_mined INTEGER NOT NULL,
            total_clicks INTEGER NOT NULL,
            upgrades_owned INTEGER NOT NULL,
            play_time INTEGER NOT NULL,
            score_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Password reset tokens table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            used BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # User achievements table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            achievement_id TEXT NOT NULL,
            unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE(user_id, achievement_id)
        )
    ''')
    
    conn.commit()
    conn.close()

def hash_password(password, salt=None):
    """Hash a password with a salt"""
    if salt is None:
        salt = secrets.token_hex(16)
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return password_hash.hex(), salt

def verify_password(password, password_hash, salt):
    """Verify a password against its hash"""
    test_hash, _ = hash_password(password, salt)
    return test_hash == password_hash

def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_password_reset_email(email, username, reset_link):
    """Send password reset email"""
    try:
        if not SMTP_USERNAME or not SMTP_PASSWORD:
            print(f"SMTP credentials not configured. Would send email to {email} with reset link: {reset_link}")
            return True
        
        msg = MIMEMultipart()
        msg['From'] = FROM_EMAIL
        msg['To'] = email
        msg['Subject'] = "Password Reset - Minecraft Clicker"
        
        body = f"""
        Hello {username},
        
        You have requested a password reset for your Minecraft Clicker account.
        
        Click the following link to reset your password:
        {reset_link}
        
        This link will expire in 1 hour.
        
        If you didn't request this reset, please ignore this email.
        
        Best regards,
        Minecraft Clicker Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        text = msg.as_string()
        server.sendmail(FROM_EMAIL, email, text)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        email = data.get('email', '').strip()
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        if len(username) < 3 or len(username) > 20:
            return jsonify({'success': False, 'message': 'Username must be 3-20 characters'}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'message': 'Password must be at least 6 characters'}), 400
        
        # Email is optional - only validate if provided
        if email and not is_valid_email(email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if username already exists
        cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'message': 'Username already taken'}), 409
        
        # Check if email already exists (only if email is provided)
        if email:
            cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
            if cursor.fetchone():
                conn.close()
                return jsonify({'success': False, 'message': 'Email already registered'}), 409
        
        # Create new user
        password_hash, salt = hash_password(password)
        cursor.execute('INSERT INTO users (username, password_hash, salt, email) VALUES (?, ?, ?, ?)', 
                      (username, password_hash, salt, email))
        user_id = cursor.lastrowid
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Registration successful'}), 201
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Registration failed: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Login a user"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, password_hash, salt, email, profile_picture FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        user_id, password_hash, salt, email, profile_picture = user
        
        if not verify_password(password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        # Update last login time
        cursor.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': 'Login successful', 
            'user_id': user_id,
            'username': username,
            'email': email,
            'profile_picture': profile_picture
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Login failed: {str(e)}'}), 500

@app.route('/api/profile', methods=['POST'])
def get_profile():
    """Get user profile"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, password_hash, salt, email, profile_picture, created_at, last_login FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        user_id, password_hash, salt, email, profile_picture, created_at, last_login = user
        
        if not verify_password(password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        
        # Get user's high scores
        cursor.execute('''
            SELECT blocks, total_mined, total_clicks, upgrades_owned, play_time, score_date
            FROM high_scores 
            WHERE user_id = ? 
            ORDER BY total_mined DESC 
            LIMIT 1
        ''', (user_id,))
        
        best_score = cursor.fetchone()
        personal_best = None
        if best_score:
            personal_best = {
                'blocks': best_score[0],
                'totalMined': best_score[1],
                'totalClicks': best_score[2],
                'upgradesOwned': best_score[3],
                'playTime': best_score[4],
                'date': best_score[5]
            }
        
        conn.close()
        
        return jsonify({
            'success': True,
            'profile': {
                'username': username,
                'email': email,
                'profile_picture': profile_picture,
                'created_at': created_at,
                'last_login': last_login,
                'personal_best': personal_best
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to get profile: {str(e)}'}), 500

@app.route('/api/profile', methods=['PUT'])
def update_profile():
    """Update user profile"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        new_email = data.get('email', '').strip()
        new_profile_picture = data.get('profile_picture', '')
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        if new_email and not is_valid_email(new_email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, password_hash, salt FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        user_id, password_hash, salt = user
        
        if not verify_password(password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
        
        # Check if email is already taken by another user
        if new_email:
            cursor.execute('SELECT id FROM users WHERE email = ? AND id != ?', (new_email, user_id))
            if cursor.fetchone():
                conn.close()
                return jsonify({'success': False, 'message': 'Email already registered by another user'}), 409
        
        # Update profile
        update_fields = []
        update_values = []
        
        if new_email:
            update_fields.append('email = ?')
            update_values.append(new_email)
        
        if new_profile_picture:
            update_fields.append('profile_picture = ?')
            update_values.append(new_profile_picture)
        
        if update_fields:
            update_values.append(user_id)
            cursor.execute(f'UPDATE users SET {", ".join(update_fields)} WHERE id = ?', update_values)
            conn.commit()
        
        conn.close()
        
        return jsonify({'success': True, 'message': 'Profile updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to update profile: {str(e)}'}), 500

@app.route('/api/change-password', methods=['POST'])
def change_password():
    """Change user password"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        
        if not username or not current_password or not new_password:
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        if len(new_password) < 6:
            return jsonify({'success': False, 'message': 'New password must be at least 6 characters'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, password_hash, salt FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        user_id, password_hash, salt = user
        
        if not verify_password(current_password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Current password is incorrect'}), 401
        
        # Hash new password
        new_password_hash, new_salt = hash_password(new_password)
        
        # Update password
        cursor.execute('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?', 
                      (new_password_hash, new_salt, user_id))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Password changed successfully'}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to change password: {str(e)}'}), 500

@app.route('/api/request-password-reset', methods=['POST'])
def request_password_reset():
    """Request a password reset"""
    try:
        print(f"[DEBUG] Password reset request received")
        data = request.get_json()
        email = data.get('email', '').strip()
        print(f"[DEBUG] Email received: {email}")
        
        if not email:
            print(f"[DEBUG] No email provided")
            return jsonify({'success': False, 'message': 'Email is required'}), 400
        
        if not is_valid_email(email):
            print(f"[DEBUG] Invalid email format: {email}")
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        print(f"[DEBUG] Connecting to database...")
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if user exists
        print(f"[DEBUG] Looking up user with email: {email}")
        cursor.execute('SELECT id, username FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        print(f"[DEBUG] User lookup result: {user}")
        
        if not user:
            print(f"[DEBUG] User not found")
            conn.close()
            # Don't reveal if email exists or not for security
            return jsonify({'success': True, 'message': 'If the email exists, a password reset link has been sent'}), 200
        
        user_id, username = user
        print(f"[DEBUG] User found - ID: {user_id}, Username: {username}")
        
        # Generate reset token
        print(f"[DEBUG] Generating reset token...")
        token = secrets.token_urlsafe(32)
        expires_at = datetime.now() + timedelta(hours=1)
        print(f"[DEBUG] Token generated: {token[:10]}..., Expires: {expires_at}")
        
        # Store token in database
        print(f"[DEBUG] Storing token in database...")
        cursor.execute('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', 
                      (user_id, token, expires_at))
        print(f"[DEBUG] Token inserted into database")
        
        print(f"[DEBUG] Committing transaction...")
        conn.commit()
        print(f"[DEBUG] Transaction committed successfully")
        conn.close()
        
        # Create reset link
        reset_link = f"https://hromp.com/minecraft-2.0/reset-password.html?token={token}"
        print(f"[DEBUG] Reset link created: {reset_link}")
        
        # Send email
        print(f"[DEBUG] Sending password reset email...")
        email_sent = send_password_reset_email(email, username, reset_link)
        print(f"[DEBUG] Email sending result: {email_sent}")
        
        return jsonify({'success': True, 'message': 'If the email exists, a password reset link has been sent'}), 200
        
    except Exception as e:
        print(f"[DEBUG] Exception in password reset: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'message': f'Password reset request failed: {str(e)}'}), 500

@app.route('/api/validate-reset-token', methods=['POST'])
def validate_reset_token():
    """Validate a password reset token"""
    try:
        data = request.get_json()
        token = data.get('token', '').strip()
        
        if not token:
            return jsonify({'success': False, 'message': 'Token is required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if token exists and is valid
        cursor.execute('''
            SELECT pt.id, pt.user_id, pt.expires_at, pt.used, u.username 
            FROM password_reset_tokens pt 
            JOIN users u ON pt.user_id = u.id 
            WHERE pt.token = ?
        ''', (token,))
        
        token_data = cursor.fetchone()
        
        if not token_data:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid or expired token'}), 400
        
        token_id, user_id, expires_at, used, username = token_data
        
        # Check if token is expired or already used
        if used or datetime.fromisoformat(expires_at) < datetime.now():
            conn.close()
            return jsonify({'success': False, 'message': 'Token has expired or already been used'}), 400
        
        conn.close()
        
        return jsonify({
            'success': True, 
            'message': 'Token is valid',
            'username': username
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Token validation failed: {str(e)}'}), 500

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    """Reset password using token"""
    try:
        data = request.get_json()
        token = data.get('token', '').strip()
        new_password = data.get('new_password', '')
        
        if not token or not new_password:
            return jsonify({'success': False, 'message': 'Token and new password are required'}), 400
        
        if len(new_password) < 6:
            return jsonify({'success': False, 'message': 'Password must be at least 6 characters'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if token exists and is valid
        cursor.execute('''
            SELECT pt.id, pt.user_id, pt.expires_at, pt.used 
            FROM password_reset_tokens pt 
            WHERE pt.token = ?
        ''', (token,))
        
        token_data = cursor.fetchone()
        
        if not token_data:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid or expired token'}), 400
        
        token_id, user_id, expires_at, used = token_data
        
        # Check if token is expired or already used
        if used or datetime.fromisoformat(expires_at) < datetime.now():
            conn.close()
            return jsonify({'success': False, 'message': 'Token has expired or already been used'}), 400
        
        # Hash new password
        password_hash, salt = hash_password(new_password)
        
        # Update user's password
        cursor.execute('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?', 
                      (password_hash, salt, user_id))
        
        # Mark token as used
        cursor.execute('UPDATE password_reset_tokens SET used = TRUE WHERE id = ?', (token_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Password reset successful'}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Password reset failed: {str(e)}'}), 500

@app.route('/api/highscores', methods=['GET'])
def get_high_scores():
    """Get top 10 high scores with live data"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Get high scores with user profile pictures
        cursor.execute('''
            SELECT h.username, h.blocks, h.total_mined, h.total_clicks, h.upgrades_owned, h.play_time, h.score_date,
                   u.profile_picture
            FROM high_scores h
            LEFT JOIN users u ON h.user_id = u.id
            ORDER BY h.total_mined DESC, h.blocks DESC 
            LIMIT 10
        ''')
        
        scores = []
        for row in cursor.fetchall():
            scores.append({
                'username': row[0],
                'blocks': row[1],
                'totalMined': row[2],
                'totalClicks': row[3],
                'upgradesOwned': row[4],
                'playTime': row[5],
                'date': row[6],
                'profilePicture': row[7] or 'default.svg'
            })
        
        conn.close()
        return jsonify({'success': True, 'scores': scores}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to get high scores: {str(e)}'}), 500

@app.route('/api/highscores/live', methods=['GET'])
def get_live_high_scores():
    """Get high scores with live current blocks data"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Get high scores with live data
        cursor.execute('''
            SELECT h.username, h.blocks, h.total_mined, h.total_clicks, h.upgrades_owned, h.play_time, h.score_date,
                   u.profile_picture, h.blocks as current_blocks
            FROM high_scores h
            LEFT JOIN users u ON h.user_id = u.id
            ORDER BY h.total_mined DESC, h.blocks DESC 
            LIMIT 10
        ''')
        
        scores = []
        for row in cursor.fetchall():
            scores.append({
                'username': row[0],
                'blocks': row[1],
                'totalMined': row[2],
                'totalClicks': row[3],
                'upgradesOwned': row[4],
                'playTime': row[5],
                'date': row[6],
                'profilePicture': row[7] or 'default.svg',
                'currentBlocks': row[8]  # This will be the same as blocks for now, but can be updated live
            })
        
        conn.close()
        return jsonify({'success': True, 'scores': scores, 'timestamp': datetime.now().isoformat()}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to get live high scores: {str(e)}'}), 500

@app.route('/api/highscores', methods=['POST'])
def save_high_score():
    """Save or update a high score (one entry per user)"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        blocks = data.get('blocks', 0)
        total_mined = data.get('totalMined', 0)
        total_clicks = data.get('totalClicks', 0)
        upgrades_owned = data.get('upgradesOwned', 0)
        play_time = data.get('playTime', 0)
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Verify user credentials
        cursor.execute('SELECT id, password_hash, salt FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        user_id, password_hash, salt = user
        
        if not verify_password(password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        # Check if user already has a high score entry
        cursor.execute('SELECT id FROM high_scores WHERE user_id = ?', (user_id,))
        existing_score = cursor.fetchone()
        
        if existing_score:
            # Only update existing high score if the new score is higher
            cursor.execute('''
                UPDATE high_scores 
                SET username = ?, blocks = ?, total_mined = ?, total_clicks = ?, 
                    upgrades_owned = ?, play_time = ?, score_date = CURRENT_TIMESTAMP
                WHERE user_id = ? AND total_mined <= ?
            ''', (username, blocks, total_mined, total_clicks, upgrades_owned, play_time, user_id, total_mined))
        else:
            # Create new high score entry
            cursor.execute('''
                INSERT INTO high_scores (user_id, username, blocks, total_mined, total_clicks, upgrades_owned, play_time)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (user_id, username, blocks, total_mined, total_clicks, upgrades_owned, play_time))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'High score updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to save high score: {str(e)}'}), 500

@app.route('/api/check-username', methods=['POST'])
def check_username():
    """Check if a username is available"""
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        
        if not username:
            return jsonify({'success': False, 'message': 'Username is required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
        exists = cursor.fetchone() is not None
        
        conn.close()
        
        return jsonify({'success': True, 'available': not exists}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to check username: {str(e)}'}), 500

@app.route('/api/user/<username>', methods=['GET'])
def get_user_profile(username):
    """Get user profile data by username"""
    try:
        if not username:
            return jsonify({'success': False, 'message': 'Username is required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Get user's latest high score data
        cursor.execute('''
            SELECT h.blocks, h.total_mined, h.total_clicks, h.upgrades_owned, h.play_time, h.score_date,
                   u.profile_picture, u.created_at
            FROM high_scores h
            LEFT JOIN users u ON h.user_id = u.id
            WHERE h.username = ?
            ORDER BY h.score_date DESC
            LIMIT 1
        ''', (username,))
        
        user_data = cursor.fetchone()
        
        if not user_data:
            # If no high score found, check if user exists
            cursor.execute('SELECT id, profile_picture, created_at FROM users WHERE username = ?', (username,))
            user_exists = cursor.fetchone()
            
            if not user_exists:
                conn.close()
                return jsonify({'success': False, 'message': 'User not found'}), 404
            
            # User exists but no high score yet
            conn.close()
            return jsonify({
                'success': True,
                'user': {
                    'username': username,
                    'blocks': 0,
                    'totalMined': 0,
                    'totalClicks': 0,
                    'upgradesOwned': 0,
                    'blocksPerSecond': 0,
                    'blocksPerClick': 0,
                    'profilePicture': user_exists[1] or 'default.svg',
                    'createdAt': user_exists[2]
                }
            }), 200
        
        # User has high score data
        blocks, total_mined, total_clicks, upgrades_owned, play_time, score_date, profile_picture, created_at = user_data
        
        # Calculate blocks per second and blocks per click
        blocks_per_second = total_mined / max(play_time, 1) if play_time > 0 else 0
        blocks_per_click = total_mined / max(total_clicks, 1) if total_clicks > 0 else 0
        
        # Get user's achievements
        cursor.execute('''
            SELECT achievement_id FROM user_achievements 
            WHERE user_id = (SELECT id FROM users WHERE username = ?)
        ''', (username,))
        
        user_achievements = [row[0] for row in cursor.fetchall()]
        
        conn.close()
        
        return jsonify({
            'success': True,
            'user': {
                'username': username,
                'blocks': blocks,
                'totalMined': total_mined,
                'totalClicks': total_clicks,
                'upgradesOwned': upgrades_owned,
                'blocksPerSecond': round(blocks_per_second, 2),
                'blocksPerClick': round(blocks_per_click, 2),
                'profilePicture': profile_picture or 'default.svg',
                'createdAt': created_at,
                'achievements': user_achievements
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to get user profile: {str(e)}'}), 500

@app.route('/api/achievements', methods=['POST'])
def save_achievement():
    """Save an achievement for a user"""
    try:
        data = request.get_json()
        username = data.get('username', '')
        password = data.get('password', '')
        achievement_id = data.get('achievement_id', '')
        
        if not username or not password or not achievement_id:
            return jsonify({'success': False, 'message': 'Username, password, and achievement_id are required'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Verify user credentials
        cursor.execute('SELECT id, password_hash, salt FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        user_id, password_hash, salt = user
        
        if not verify_password(password, password_hash, salt):
            conn.close()
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        # Check if achievement already exists
        cursor.execute('SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?', (user_id, achievement_id))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': True, 'message': 'Achievement already exists'}), 200
        
        # Save the achievement
        cursor.execute('INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)', (user_id, achievement_id))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Achievement saved successfully'}), 201
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to save achievement: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'success': True, 'status': 'healthy', 'timestamp': datetime.now().isoformat()}), 200

if __name__ == '__main__':
    init_db()
    print("Enhanced High Scores API initialized. Database created at:", DB_PATH)
    app.run(host='0.0.0.0', port=5001, debug=True) 