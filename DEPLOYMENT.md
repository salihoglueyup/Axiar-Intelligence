# Deployment Guide

This guide covers the complete deployment process for the Axiar Intelligence Platform.

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+
- npm 9+
- Git
- Vercel account
- Supabase account

### One-Click Deployment

1. **Clone and Deploy**
```bash
git clone https://github.com/your-org/axiosintelligence.git
cd axiosintelligence
```

2. **Connect to Vercel**
```bash
npm install -g vercel
vercel login
vercel link
```

3. **Deploy**
```bash
vercel --prod
```

## 📋 Detailed Deployment

### Step 1: Environment Setup

#### 1.1 Clone Repository
```bash
git clone https://github.com/your-org/axiosintelligence.git
cd axiosintelligence
```

#### 1.2 Install Dependencies
```bash
npm install
cd client
npm install
cd ..
```

#### 1.3 Environment Variables
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vercel
VERCEL_ENV=production

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Feature Flags
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_WORKFLOWS=true
```

### Step 2: Database Setup

#### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down project URL and keys

#### 2.2 Run Migrations
```bash
npm run supabase:start
npm run supabase:push
```

#### 2.3 Seed Database (Optional)
```bash
npm run supabase:seed
```

### Step 3: Frontend Build

#### 3.1 Build for Production
```bash
cd client
npm run build
```

#### 3.2 Test Build
```bash
npm run preview
```

### Step 4: API Deployment

#### 4.1 Deploy to Vercel
```bash
vercel --prod
```

#### 4.2 Configure Environment Variables in Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all environment variables

### Step 5: Domain Configuration

#### 5.1 Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
```

#### 5.2 SSL Certificate
Vercel automatically provisions SSL certificates.

## 🔧 Environment Configurations

### Development
```bash
npm run dev
```
- Hot reload enabled
- Development database
- Debug mode
- Source maps

### Staging
```bash
vercel --preview
```
- Production build
- Staging database
- Performance monitoring
- Error tracking

### Production
```bash
vercel --prod
```
- Optimized build
- Production database
- Full monitoring
- Security hardening

## 📊 Performance Optimization

### Build Optimizations
```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "build:profile": "vite build --mode profile"
  }
}
```

### Bundle Analysis
```bash
cd client
npm run build:analyze
```

### Image Optimization
- WebP format conversion
- Responsive images
- Lazy loading
- CDN optimization

## 🔒 Security Configuration

### Environment Variables Security
```bash
# Never commit secrets to git
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
```

### Database Security
- Row Level Security (RLS) enabled
- Service role key restricted
- Connection pooling
- IP whitelisting

### API Security
- Rate limiting enabled
- CORS configured
- Input validation
- SQL injection prevention

## 📈 Monitoring Setup

### Vercel Analytics
1. Enable Vercel Analytics
2. Configure custom events
3. Set up dashboards

### Error Tracking
```bash
npm install @sentry/nextjs
```

### Performance Monitoring
```bash
npm install @vercel/analytics
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Environment Secrets
Add to GitHub repository settings:
- `VERCEL_TOKEN`
- `ORG_ID`
- `PROJECT_ID`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 🚀 Production Deployment

### Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates valid
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Rollback plan ready

### Deployment Steps
```bash
# 1. Pull latest changes
git pull origin main

# 2. Install dependencies
npm ci

# 3. Run tests
npm run test

# 4. Build application
npm run build

# 5. Deploy to production
vercel --prod

# 6. Verify deployment
curl https://yourdomain.com/api/health
```

### Post-Deployment
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify all functionality
- [ ] Update documentation
- [ ] Notify team

## 🔄 Rollback Procedure

### Quick Rollback
```bash
# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Database Rollback
```bash
# Reset database to previous state
npm run supabase:rollback
```

### Emergency Rollback
```bash
# Disable application
vercel alias set yourdomain.com https://your-app-maintenance.vercel.app

# Fix issues
# Re-deploy when ready
vercel --prod
```

## 📱 Mobile Deployment

### PWA Installation
```bash
# Build PWA
npm run build:pwa

# Deploy
vercel --prod
```

### App Store Submission
1. Build native app wrapper
2. Prepare app store assets
3. Submit to app stores
4. Wait for approval

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run type-check

# Check linting
npm run lint
```

#### Database Issues
```bash
# Reset database
npm run supabase:reset

# Check migrations
npm run supabase:migrate:status

# View logs
npm run supabase:logs
```

#### Performance Issues
```bash
# Analyze bundle
npm run build:analyze

# Check Lighthouse
npx lighthouse https://yourdomain.com

# Monitor Vercel logs
vercel logs
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Database debug
SUPABASE_DEBUG=true npm run dev
```

## 📊 Performance Monitoring

### Key Metrics
- **Lighthouse Score**: 95+
- **Core Web Vitals**: All "Good"
- **Bundle Size**: < 500KB
- **Load Time**: < 2s
- **TTI**: < 3s
- **CLS**: < 0.1

### Monitoring Tools
- Vercel Analytics
- Google Analytics
- Sentry Error Tracking
- Custom monitoring dashboard

### Alerting
- Error rate > 5%
- Response time > 3s
- Uptime < 99.9%
- Database connections > 80%

## 🔐 Security Best Practices

### Regular Updates
```bash
# Update dependencies
npm audit fix
npm update

# Check vulnerabilities
npm audit
```

### Security Headers
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'" }
      ]
    }
  ]
}
```

### Backup Strategy
- Daily database backups
- Code repository backups
- Configuration backups
- Disaster recovery plan

## 📚 Additional Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://typescriptlang.org)

### Tools
- [Vercel CLI](https://vercel.com/cli)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Support
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- GitHub Issues: [Report issues](https://github.com/your-org/axiosintelligence/issues)
- Community: [Discord](https://discord.gg/axiosintelligence)

---

**For production deployment, please ensure all security measures are in place and monitoring is properly configured.**
