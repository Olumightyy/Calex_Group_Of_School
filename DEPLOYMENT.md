# Deployment Guide

## Deployment Overview

This guide covers deploying the School Management System to production using Vercel and Supabase.

## Prerequisites

- GitHub account with repository
- Vercel account (free tier available)
- Supabase project (production)
- Domain name (optional)

## Step 1: Prepare for Production

### 1.1 Update Environment Variables

Create production environment variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com
\`\`\`

### 1.2 Build Locally

\`\`\`bash
npm run build
npm start
\`\`\`

Test that everything works before deploying.

### 1.3 Commit to GitHub

\`\`\`bash
git add .
git commit -m "Production ready"
git push origin main
\`\`\`

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### 2.2 Configure Environment Variables

1. In Vercel dashboard, go to Settings > Environment Variables
2. Add production environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

### 2.3 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your site is now live!

## Step 3: Configure Supabase for Production

### 3.1 Update Auth Settings

1. Go to Supabase dashboard
2. Settings > Auth > Email Templates
3. Update redirect URLs to your production domain

### 3.2 Enable Email Verification

1. Settings > Auth > Email
2. Enable "Confirm email"
3. Configure email provider (optional)

### 3.3 Set Up CORS

1. Settings > API
2. Add your production domain to CORS whitelist

### 3.4 Enable SSL

1. Settings > Database
2. Ensure SSL is enabled (default)

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain to Vercel

1. Vercel dashboard > Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 4.2 Update Supabase Redirect URLs

1. Supabase Settings > Auth
2. Update redirect URLs to use custom domain

## Step 5: Monitoring and Maintenance

### 5.1 Set Up Monitoring

- Enable Vercel Analytics
- Set up error tracking
- Monitor database performance

### 5.2 Regular Backups

- Supabase automatic backups (daily)
- Download backups regularly
- Test restore procedures

### 5.3 Security Updates

- Keep dependencies updated
- Monitor security advisories
- Update Supabase settings

## Deployment Checklist

- [ ] Environment variables configured
- [ ] GitHub repository connected
- [ ] Build successful locally
- [ ] Vercel deployment successful
- [ ] Domain configured (if using custom)
- [ ] Email verification enabled
- [ ] CORS configured
- [ ] SSL enabled
- [ ] Monitoring set up
- [ ] Backups configured

## Post-Deployment

### 1. Test All Features

- [ ] User registration
- [ ] User login
- [ ] Dashboard access
- [ ] API endpoints
- [ ] Database queries
- [ ] Email notifications

### 2. Performance Optimization

- [ ] Enable caching
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Set up CDN

### 3. Security Hardening

- [ ] Enable 2FA
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Set security headers

## Troubleshooting

### Deployment Failed

1. Check build logs in Vercel
2. Verify environment variables
3. Check GitHub repository
4. Review error messages

### Database Connection Error

1. Verify Supabase URL and key
2. Check CORS settings
3. Verify network connectivity
4. Check RLS policies

### Authentication Issues

1. Verify email settings
2. Check redirect URLs
3. Confirm email verification enabled
4. Review auth policies

## Scaling

### Database Scaling

- Supabase handles auto-scaling
- Monitor database performance
- Upgrade plan if needed

### Application Scaling

- Vercel handles auto-scaling
- Monitor API usage
- Optimize queries

## Cost Optimization

### Supabase
- Free tier: 500MB database
- Pro tier: $25/month
- Enterprise: Custom pricing

### Vercel
- Free tier: Unlimited deployments
- Pro tier: $20/month
- Enterprise: Custom pricing

## Disaster Recovery

### Backup Strategy

1. Daily automatic backups (Supabase)
2. Weekly manual backups
3. Monthly archive backups
4. Test restore procedures

### Recovery Procedure

1. Download backup from Supabase
2. Create new Supabase project
3. Restore backup
4. Update environment variables
5. Redeploy application

## Maintenance Schedule

### Daily
- Monitor error logs
- Check system health
- Review user feedback

### Weekly
- Review analytics
- Check performance metrics
- Update dependencies

### Monthly
- Security audit
- Performance review
- Backup verification
- User feedback analysis

### Quarterly
- Major updates
- Security patches
- Feature releases
- Capacity planning

## Support

For deployment issues:

1. Check Vercel documentation
2. Check Supabase documentation
3. Review error logs
4. Contact support teams

## Next Steps

1. Deploy to production
2. Monitor performance
3. Gather user feedback
4. Plan improvements
5. Scale as needed

---

**Your School Management System is now live in production!**
