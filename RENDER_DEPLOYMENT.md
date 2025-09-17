# Render.com Deployment Configuration

## Build Settings for Render.com

### Environment Settings
- **Runtime**: Node.js 18.x or higher
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Required Environment Variables
Make sure to set these in your Render.com service environment:

```bash
# Database
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret_key

# Email Service (if using)
EMAIL_HOST=smtp.your-email-service.com
EMAIL_PORT=587
EMAIL_USER=your_email@domain.com
EMAIL_PASSWORD=your_email_password

# Other environment variables as needed
NODE_ENV=production
PORT=3000
```

### Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Render.com

2. **Service Configuration**:
   - Service Type: Web Service
   - Runtime: Node.js
   - Build Command: `npm run build`
   - Start Command: `npm start`

3. **Environment Variables**: Add all required environment variables in the Render dashboard

4. **Auto-Deploy**: Enable auto-deploy from your main branch

### Database Setup

If using Render's managed database:
1. Create a PostgreSQL or MySQL database service
2. Copy the connection details to your environment variables
3. Update your database configuration accordingly

### Health Check Endpoint

Consider adding a health check endpoint to your Express app:

```typescript
// Add to your main app file
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Monitoring

- Use Render's built-in logs for monitoring
- Set up alerting for failed deployments
- Monitor response times and error rates

### Production Optimizations

1. **Enable gzip compression**:
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Set appropriate security headers** (already using helmet)

3. **Configure CORS properly** for your frontend domain

### Troubleshooting Common Issues

1. **Build Failures**: Check the build logs for missing dependencies or compilation errors
2. **Start Failures**: Verify environment variables are set correctly
3. **Database Connection**: Ensure database credentials and connectivity
4. **Memory Issues**: Monitor memory usage and upgrade service if needed

### Performance Tips

- Use NODE_ENV=production
- Minimize dependencies in package.json
- Use npm ci instead of npm install in production
- Consider enabling Keep-Alive for database connections

Your application is now ready for deployment with the ES Module issues resolved!