# Email Verification for Healthcare Sign-Up

## Information Gathered
- Healthcare sign-up endpoint at `/api/healthcare/sign-up`
- User model needed fields for verification status and token
- Email service utility available for sending verification emails
- Need to add verification endpoint and update login flow

## Plan
1. Update HealthcareUser model to include isVerified, isActive, and verificationToken fields
2. Modify healthcareSignUp service to generate verification token and send email
3. Add verifyEmail service function with token validation and expiration check
4. Update healthcareLogin to check verification status
5. Add healthcareVerifyEmail controller and route
6. Test the complete sign-up and verification flow

## Dependent Files to be edited
- `src/modules/healthcare/healthcare.models.ts` - Add verification fields
- `src/modules/healthcare/healthcare.services.ts` - Add token generation, email sending, and verification logic
- `src/modules/healthcare/healthcare.controllers.ts` - Add verify email controller
- `src/modules/healthcare/healthcare.routes.ts` - Add verify email route

## Followup steps
- Test sign-up endpoint to ensure email is sent
- Test verify-email endpoint with valid and invalid tokens
- Test login with unverified account
- Ensure database migrations if needed for new fields
