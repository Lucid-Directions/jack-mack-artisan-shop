# Stripe Integration Setup Guide

## Security Warning
**NEVER put your secret key (sk_live_...) in frontend code or commit it to Git!**

## Required Steps:

### 1. Get Your Publishable Key
You need your Stripe **publishable key** (starts with `pk_test_` or `pk_live_`) from your Stripe Dashboard.

### 2. Update Environment Variables
Replace the placeholder in `.env.local`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY
```

### 3. Backend Setup (Required)
The secret key must be used on your backend. Options:

**Option A: Vercel/Netlify Functions**
- Deploy the `api/create-payment-intent.js` file
- Set `STRIPE_SECRET_KEY` environment variable in your hosting platform
- Install stripe: `npm install stripe`

**Option B: Express Server**
```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  // Copy logic from api/create-payment-intent.js
});
```

**Option C: Next.js API Routes**
- Move `api/create-payment-intent.js` to `pages/api/` or `app/api/`

### 4. Environment Variables for Backend
Set these on your server/hosting platform:
```
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

## Testing
1. Use Stripe test keys first
2. Test with test card: 4242 4242 4242 4242
3. Switch to live keys only when ready for production

## Current Status
- ✅ Frontend Stripe integration added
- ✅ Environment variable structure created
- ⚠️ Backend API endpoint created (needs deployment)
- ⚠️ Secret key needs to be configured on backend
- ⚠️ Publishable key needs to be added to .env.local