# 🚀 Deployment Guide

## Quick Deploy Options

### 1. **Netlify (Recommended for Frontend)**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist` folder
   - Or connect your GitHub repository

3. **Configure redirects** (for React Router)
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### 2. **Vercel**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### 3. **Docker Deployment**

1. **Build Docker image**
   ```bash
   docker build -t healthcare-frontend .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:80 healthcare-frontend
   ```

3. **Or use Docker Compose**
   ```bash
   docker-compose up -d
   ```

### 4. **AWS S3 + CloudFront**

1. **Build project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `dist` contents

3. **Configure CloudFront**
   - Create distribution
   - Set error pages to redirect to `/index.html`

## Environment Configuration

### **Production Environment Variables**
```env
VITE_API_URL=https://your-backend-domain.com
VITE_NODE_ENV=production
```

### **Staging Environment**
```env
VITE_API_URL=https://staging-api.your-domain.com
VITE_NODE_ENV=staging
```

## Backend Connection

Ensure your backend:
1. **CORS is configured** for your frontend domain
2. **HTTPS is enabled** for production
3. **Environment variables** are properly set

## Performance Optimization

### **Before Deployment**
1. **Optimize images** - Use WebP format
2. **Code splitting** - Already configured with Vite
3. **Bundle analysis** - Run `npm run build` and check sizes

### **After Deployment**
1. **Enable Gzip** - Configured in nginx.conf
2. **Set cache headers** - Static assets cached for 1 year
3. **Monitor performance** - Use Lighthouse

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API endpoints secured
- [ ] Environment variables protected
- [ ] No sensitive data in client code

## Monitoring

### **Recommended Tools**
- **Google Analytics** - User behavior
- **Sentry** - Error tracking
- **Lighthouse** - Performance monitoring
- **Uptime Robot** - Availability monitoring

## Troubleshooting

### **Common Deployment Issues**

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues (404 on refresh)**
```
Solution: Configure server redirects
All routes should serve index.html
```

**API Connection Issues**
```
Check: CORS configuration
Check: Environment variables
Check: Network connectivity
```

**Performance Issues**
```
Solution: Enable compression
Solution: Optimize images
Solution: Use CDN
```