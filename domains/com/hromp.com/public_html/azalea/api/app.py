#!/usr/bin/env python3
"""
Azalea Art Gallery API
Flask backend for managing the art gallery
"""

import os
import sqlite3
import hashlib
import secrets
import jwt
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from PIL import Image
import json

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'images')
DATABASE = os.path.join(os.path.dirname(__file__), 'gallery.db')
SECRET_KEY = 'azalea-gallery-secret-key-change-in-production'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Admin credentials (in production, use environment variables)
ADMIN_USERNAME = 'azalea'
ADMIN_PASSWORD_HASH = hashlib.sha256('azalea'.encode()).hexdigest()

def init_db():
    """Initialize the database"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            title TEXT,
            description TEXT,
            display_order INTEGER DEFAULT 0,
            rotation INTEGER DEFAULT 0,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_token():
    """Generate JWT token for admin authentication"""
    payload = {
        'username': ADMIN_USERNAME,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    """Verify JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['username'] == ADMIN_USERNAME
    except:
        return False

def require_auth(f):
    """Decorator to require authentication"""
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'No token provided'}), 401
        
        token = auth_header.split(' ')[1]
        if not verify_token(token):
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

def rotate_image(filename, degrees):
    """Rotate an image by the specified degrees"""
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    
    if not os.path.exists(file_path):
        return False
    
    try:
        with Image.open(file_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Rotate the image
            rotated_img = img.rotate(-degrees, expand=True)  # Negative for clockwise
            
            # Save the rotated image
            rotated_img.save(file_path, 'JPEG', quality=85, optimize=True)
            return True
    except Exception as e:
        print(f"Error rotating image {filename}: {e}")
        return False

@app.route('/api/login', methods=['POST'])
def login():
    """Admin login endpoint"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    if username == ADMIN_USERNAME and password_hash == ADMIN_PASSWORD_HASH:
        token = generate_token()
        return jsonify({'token': token, 'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/verify', methods=['GET'])
def verify():
    """Verify token endpoint"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'No token provided'}), 401
    
    token = auth_header.split(' ')[1]
    if verify_token(token):
        return jsonify({'valid': True})
    else:
        return jsonify({'error': 'Invalid token'}), 401

@app.route('/api/images', methods=['GET'])
def get_images():
    """Get all images for the gallery"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, filename, title, description, display_order, rotation, uploaded_at
        FROM images
        ORDER BY display_order ASC, uploaded_at ASC
    ''')
    
    images = []
    for row in cursor.fetchall():
        images.append({
            'id': row[0],
            'filename': row[1],
            'title': row[2],
            'description': row[3],
            'display_order': row[4],
            'rotation': row[5],
            'uploaded_at': row[6]
        })
    
    conn.close()
    return jsonify(images)

@app.route('/api/upload', methods=['POST'])
@require_auth
def upload_image():
    """Upload a new image"""
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    # Check file size
    file.seek(0, 2)  # Seek to end
    file_size = file.tell()
    file.seek(0)  # Reset to beginning
    
    if file_size > MAX_FILE_SIZE:
        return jsonify({'error': 'File too large'}), 400
    
    # Generate secure filename
    filename = secure_filename(file.filename)
    name, ext = os.path.splitext(filename)
    unique_filename = f"{name}_{secrets.token_hex(8)}{ext}"
    
    # Save file
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)
    
    # Optimize image
    try:
        with Image.open(file_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too large
            max_size = (1920, 1080)
            if img.size[0] > max_size[0] or img.size[1] > max_size[1]:
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                img.save(file_path, 'JPEG', quality=85, optimize=True)
    except Exception as e:
        # If image processing fails, remove the file
        os.remove(file_path)
        return jsonify({'error': 'Invalid image file'}), 400
    
    # Save to database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get next display order
    cursor.execute('SELECT MAX(display_order) FROM images')
    max_order = cursor.fetchone()[0] or 0
    
    cursor.execute('''
        INSERT INTO images (filename, title, description, display_order, rotation)
        VALUES (?, ?, ?, ?, ?)
    ''', (unique_filename, '', '', max_order + 1, 0))
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': 'Image uploaded successfully',
        'filename': unique_filename
    })

@app.route('/api/images/<int:image_id>', methods=['PUT'])
@require_auth
def update_image(image_id):
    """Update image metadata"""
    data = request.get_json()
    title = data.get('title', '')
    description = data.get('description', '')
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE images
        SET title = ?, description = ?
        WHERE id = ?
    ''', (title, description, image_id))
    
    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Image not found'}), 404
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Image updated successfully'})

@app.route('/api/images/<int:image_id>', methods=['DELETE'])
@require_auth
def delete_image(image_id):
    """Delete an image"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get filename before deleting
    cursor.execute('SELECT filename FROM images WHERE id = ?', (image_id,))
    result = cursor.fetchone()
    
    if not result:
        conn.close()
        return jsonify({'error': 'Image not found'}), 404
    
    filename = result[0]
    
    # Delete from database
    cursor.execute('DELETE FROM images WHERE id = ?', (image_id,))
    conn.commit()
    conn.close()
    
    # Delete file
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    return jsonify({'message': 'Image deleted successfully'})

@app.route('/api/images/<int:image_id>/move', methods=['POST'])
@require_auth
def move_image(image_id):
    """Move image to new position"""
    data = request.get_json()
    new_position = data.get('position')
    
    if new_position is None:
        return jsonify({'error': 'Position required'}), 400
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get current image info
    cursor.execute('SELECT display_order FROM images WHERE id = ?', (image_id,))
    result = cursor.fetchone()
    
    if not result:
        conn.close()
        return jsonify({'error': 'Image not found'}), 404
    
    current_order = result[0]
    
    # Get all images ordered by display_order
    cursor.execute('SELECT id, display_order FROM images ORDER BY display_order')
    images = cursor.fetchall()
    
    # Find the image to swap with
    target_image_id = None
    if new_position == 'up' and current_order > 1:
        # Move up
        for img_id, order in images:
            if order == current_order - 1:
                target_image_id = img_id
                break
    elif new_position == 'down':
        # Move down
        for img_id, order in images:
            if order == current_order + 1:
                target_image_id = img_id
                break
    elif isinstance(new_position, int):
        # Move to specific position
        if 0 <= new_position < len(images):
            target_image_id = images[new_position][0]
    
    if target_image_id:
        # Swap display orders
        cursor.execute('SELECT display_order FROM images WHERE id = ?', (target_image_id,))
        target_order = cursor.fetchone()[0]
        
        cursor.execute('UPDATE images SET display_order = ? WHERE id = ?', (target_order, image_id))
        cursor.execute('UPDATE images SET display_order = ? WHERE id = ?', (current_order, target_image_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Image moved successfully'})

@app.route('/api/images/<int:image_id>/rotate', methods=['POST'])
@require_auth
def rotate_image_endpoint(image_id):
    """Rotate an image by 90 degrees"""
    data = request.get_json()
    direction = data.get('direction', 'clockwise')  # 'clockwise' or 'counterclockwise'
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get filename and current rotation
    cursor.execute('SELECT filename, rotation FROM images WHERE id = ?', (image_id,))
    result = cursor.fetchone()
    
    if not result:
        conn.close()
        return jsonify({'error': 'Image not found'}), 404
    
    filename, current_rotation = result
    
    # Calculate new rotation
    if direction == 'clockwise':
        new_rotation = (current_rotation + 90) % 360
        degrees_to_rotate = 90
    else:  # counterclockwise
        new_rotation = (current_rotation - 90) % 360
        degrees_to_rotate = -90
    
    # Rotate the actual image file
    if rotate_image(filename, degrees_to_rotate):
        # Update rotation in database
        cursor.execute('UPDATE images SET rotation = ? WHERE id = ?', (new_rotation, image_id))
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Image rotated successfully',
            'new_rotation': new_rotation
        })
    else:
        conn.close()
        return jsonify({'error': 'Failed to rotate image'}), 500

@app.route('/api/rotate-all', methods=['POST'])
@require_auth
def rotate_all_images():
    """Rotate all images by 90 degrees clockwise"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get all images
    cursor.execute('SELECT id, filename, rotation FROM images')
    images = cursor.fetchall()
    
    rotated_count = 0
    failed_count = 0
    
    for image_id, filename, current_rotation in images:
        new_rotation = (current_rotation + 90) % 360
        
        if rotate_image(filename, 90):
            cursor.execute('UPDATE images SET rotation = ? WHERE id = ?', (new_rotation, image_id))
            rotated_count += 1
        else:
            failed_count += 1
    
    conn.commit()
    conn.close()
    
    return jsonify({
        'message': f'Rotated {rotated_count} images successfully',
        'rotated_count': rotated_count,
        'failed_count': failed_count
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

if __name__ == '__main__':
    init_db()
    app.run(host='127.0.0.1', port=5002, debug=False)
