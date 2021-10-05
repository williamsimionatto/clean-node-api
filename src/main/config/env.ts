export default {
  mongoUrl: 'mongodb://localhost:27017/clean-node-api',
  port: 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'tj12=23A'
}
