import rateLimit from 'express-rate-limit';

// Middleware de limitación de intentos de login
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 5,  // 5 intentos por IP
  message: 'Demasiados intentos de inicio de sesión. Intenta más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;