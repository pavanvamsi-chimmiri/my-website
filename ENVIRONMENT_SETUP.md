# Environment Variables Setup

Please create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/my_website_db?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Resend
RESEND_API_KEY="your-resend-api-key"
```

## Database Setup

1. Make sure PostgreSQL is running
2. Create a database named `my_website_db` (or update the DATABASE_URL accordingly)
3. Update the DATABASE_URL with your actual PostgreSQL credentials
4. Run `npx prisma db push` to create the database schema

## Next Steps

After setting up the environment variables:

1. Run `npx prisma db push` to create the database schema
2. Run `npx prisma generate` to generate the Prisma client
3. Start implementing the authentication system
