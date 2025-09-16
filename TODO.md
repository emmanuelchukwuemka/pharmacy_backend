# TODO for Healthcare Sign-Up Email Verification Feature

- [x] Update HealthcareUser model to add isVerified, isActive, verificationToken fields
- [x] Modify healthcareSignUp service to generate verification token and send verification email
- [x] Add verifyEmail service to verify user by token and activate account
- [x] Update healthcareLogin service to check for verified and active user status
- [x] Add healthcareVerifyEmail controller to handle verification requests
- [x] Add /verify-email route in healthcare.routes.ts
- [ ] Write integration tests for sign-up and email verification flow
- [ ] Test the full sign-up, email verification, and login process manually
- [ ] Fix any issues found during testing

Next steps:
- Implement integration tests in tests/ directory
- Run tests and verify functionality
