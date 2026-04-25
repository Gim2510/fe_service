# Product Overview

## Project Purpose
A B2B SaaS platform frontend that provides digital maturity assessment (survey), user management, admin dashboard, and premium subscription features. The platform targets companies and professionals seeking to evaluate and improve their digital transformation readiness.

## Key Features
- **Digital Maturity Survey**: Multi-step survey flow with scoring, recap dashboards, and PDF report generation
- **Authentication**: JWT-based auth with auto-logout on token expiry, email verification, OAuth (Google) support, password reset flow
- **User Dashboard**: Profile management, VIP/premium status, survey history
- **Admin Dashboard**: User management (view, delete, suspend, set VIP/admin), bulk notifications, KPI stats, job offer management
- **Premium Subscription**: Stripe-based checkout flow with success/cancel pages
- **Careers**: Job application flow with multi-step form
- **Chatbot**: Integrated chat widget
- **3D Globe Visualization**: Interactive globe on homepage using cobe/react-globe.gl
- **Theme Support**: Light/dark mode toggle

## Target Users
- **End users**: Companies/professionals taking digital maturity assessments
- **Admin users**: Platform administrators managing users, content, and analytics
- **Premium users**: Subscribers with access to advanced features and reports

## Core User Flows
1. Register → Verify Email → Login → Take Survey → View Recap
2. Login → User Dashboard → Edit Profile / Upgrade to Premium
3. Admin Login → Admin Dashboard → Manage Users / View Stats / Manage Job Offers
4. Browse → Careers Page → Submit Job Application
