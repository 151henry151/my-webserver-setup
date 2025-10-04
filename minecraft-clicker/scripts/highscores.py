#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os
import json
from datetime import datetime
import secrets
import re

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Database setup
DB_PATH = 'highscores.db'

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
            email TEXT UNIQUE,
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
        
        if email and not is_valid_email(email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if username already exists
        cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'success': False, 'message': 'Username already taken'}), 409
        
        # Check if email already exists (if provided)
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

@app.route('/api/highscores', methods=['GET'])
def get_high_scores():
    """Get top 10 high scores"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
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

@app.route('/api/highscores', methods=['POST'])
def save_high_score():
    """Save a new high score"""
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
        
        # Save the high score
        cursor.execute('''
            INSERT INTO high_scores (user_id, username, blocks, total_mined, total_clicks, upgrades_owned, play_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, username, blocks, total_mined, total_clicks, upgrades_owned, play_time))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'High score saved successfully'}), 201
        
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

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'success': True, 'status': 'healthy', 'timestamp': datetime.now().isoformat()}), 200

if __name__ == '__main__':
    init_db()
    print("Enhanced High Scores API initialized. Database created at:", DB_PATH)
    app.run(host='0.0.0.0', port=5001, debug=True) 