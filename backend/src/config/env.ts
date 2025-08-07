import * as dotenv from 'dotenv'
import * as path from 'path'

// Detect environment
const ENV = process.env.NODE_ENV || 'development'
// Load appropriate .env file
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${ENV}`)
})

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_prefix: process.env.BASE_PREFIX || 'api',
  version: process.env.VERSION,
  fileServer: process.env.FILE_SERVER || 'http://localhost:3001', // Replace with your file server URL
  email: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'myapp',
    port: Number(process.env.DB_PORT) || 3306 // Default MySQL port
  }
}
