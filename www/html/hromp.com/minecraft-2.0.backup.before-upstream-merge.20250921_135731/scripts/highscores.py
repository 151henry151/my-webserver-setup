#!/usr/bin/env python3
"""
Minecraft Clicker High Scores API
Handles user registration, login, and high score management
"""

import sqlite3
import hashlib
import secrets
import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Database configuration
DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'highscores.db')

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            email TEXT,
            profile_picture TEXT DEFAULT 'steve.svg',
            high_score INTEGER DEFAULT 0,
            total_blocks INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    ''')
    
    # Create high_scores table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS high_scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            username TEXT NOT NULL,
            score INTEGER NOT NULL,
            blocks INTEGER NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def hash_password(password, salt=None):
    """Hash a password with a salt using PBKDF2"""
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
    conn = None
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
        
        conn = sqlite3.connect(DB_PATH, timeout=30.0)
        cursor = conn.cursor()
        
        # Check if username already exists
        cursor.execute('SELECT id FROM users WHERE username = ?', (username,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'Username already taken'}), 409
        
        # Check if email already exists (if provided)
        if email:
            cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
            if cursor.fetchone():
                return jsonify({'success': False, 'message': 'Email already registered'}), 409
        
        # Create new user
        password_hash, salt = hash_password(password)
        cursor.execute('INSERT INTO users (username, password_hash, salt, email) VALUES (?, ?, ?, ?)', 
                      (username, password_hash, salt, email))
        user_id = cursor.lastrowid
        
        conn.commit()
        
        return jsonify({'success': True, 'message': 'Registration successful'}), 201
        
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'success': False, 'message': f'Registration failed: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    """Login a user"""
    conn = None
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400
        
        conn = sqlite3.connect(DB_PATH, timeout=30.0)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, password_hash, salt, email, profile_picture FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        user_id, password_hash, salt, email, profile_picture = user
        
        if not verify_password(password, password_hash, salt):
            return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
        
        # Update last login time
        cursor.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (user_id,))
        conn.commit()
        
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
    finally:
        if conn:
            conn.close()

@app.route('/api/profile', methods=['POST'])
def get_profile():
    """Get user profile"""
    conn = None
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({'success': False, 'message': 'User ID is required'}), 400
        
        conn = sqlite3.connect(DB_PATH, timeout=30.0)
        cursor = conn.cursor()
        
        cursor.execute('SELECT username, email, profile_picture, high_score, total_blocks FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        username, email, profile_picture, high_score, total_blocks = user
        
        return jsonify({
            'success': True,
            'username': username,
            'email': email,
            'profile_picture': profile_picture,
            'high_score': high_score,
            'total_blocks': total_blocks
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'Profile retrieval failed: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/highscores', methods=['GET'])
def get_highscores():
    """Get top high scores"""
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH, timeout=30.0)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT username, score, blocks, timestamp 
            FROM high_scores 
            ORDER BY score DESC 
            LIMIT 10
        ''')
        
        scores = []
        for row in cursor.fetchall():
            scores.append({
                'username': row[0],
                'score': row[1],
                'blocks': row[2],
                'timestamp': row[3]
            })
        
        return jsonify({'success': True, 'scores': scores}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': f'High scores retrieval failed: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

@app.route('/api/submit_score', methods=['POST'])
def submit_score():
    """Submit a high score"""
    conn = None
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        username = data.get('username', '').strip()
        score = data.get('score', 0)
        blocks = data.get('blocks', 0)
        
        if not username:
            return jsonify({'success': False, 'message': 'Username is required'}), 400
        
        conn = sqlite3.connect(DB_PATH, timeout=30.0)
        cursor = conn.cursor()
        
        # Insert high score
        cursor.execute('''
            INSERT INTO high_scores (user_id, username, score, blocks) 
            VALUES (?, ?, ?, ?)
        ''', (user_id, username, score, blocks))
        
        # Update user's high score if this is higher
        if user_id:
            cursor.execute('''
                UPDATE users 
                SET high_score = MAX(high_score, ?), total_blocks = MAX(total_blocks, ?)
                WHERE id = ?
            ''', (score, blocks, user_id))
        
        conn.commit()
        
        return jsonify({'success': True, 'message': 'Score submitted successfully'}), 200
        
    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({'success': False, 'message': f'Score submission failed: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5001, debug=False)
