import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Stripe publishable key is not defined. Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment variables.');
}

export const stripePromise = loadStripe(stripePublishableKey);