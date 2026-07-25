import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '12h';

/**
 * Generate JWT token for authenticated user
 * @param {Object} user - { id, email, name }
 * @returns {string} JWT token
 */
export function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

/**
 * Verify JWT token from request Authorization header
 * @param {Request} request
 * @returns {{ userId, email, name }} decoded user data
 * @throws {Response} 401 response if token is invalid
 */
export function verifyToken(request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Response(
      JSON.stringify({ success: false, error: 'Tidak ada token autentikasi' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    let message = 'Token tidak valid';
    if (err.name === 'TokenExpiredError') {
      message = 'Token sudah expired, silakan login ulang';
    }
    throw new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}