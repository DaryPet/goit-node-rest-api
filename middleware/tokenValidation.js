import jwt from 'jsonwebtoken';
import { User } from '../db/index.js';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        message: 'Not authorized'
      });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        message: 'Not authorized'
      });
    }

    // Проверяем токен
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ищем пользователя с этим токеном
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        token: token
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Not authorized'
      });
    }

    req.user = {
      userId: user.id,
      email: user.email
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Not authorized'
      });
    }
    
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

export default tokenValidation;
