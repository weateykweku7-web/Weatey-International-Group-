# Weatey International Group — Website App Starter

Responsive parent-company website with five business divisions, a logo, contact links, and Firebase email/password registration and sign-in.

## Included
- `index.html`, `styles.css`, `app.js`
- `assets/logo.svg`
- Firebase config template and starter Firestore rules
- Public registration with new accounts marked `pending_approval`
- Sign-in and account deletion control

## Run locally / deploy
1. Create a Firebase project at https://console.firebase.google.com/.
2. Enable **Authentication → Email/Password**.
3. Create a **Cloud Firestore** database.
4. Copy `firebase-config.example.js` to `firebase-config.js` and enter your Firebase web app configuration.
5. Apply `firestore.rules` in Firestore Rules.
6. Upload the project to GitHub and deploy with Netlify. Publish directory: project root.
7. Add your domain `trustyourself.com` in Netlify domain settings and follow its DNS instructions.

## Important account notes
- This is a functional starter, not a deployed live service.
- New member documents are created with `status: pending_approval`.
- The UI does not grant approved-member privileges. Build a secure admin approval workflow using server-side Firebase Admin SDK or custom claims before using this for real membership.
- Account deletion currently deletes the Firebase Authentication user. A secure server-side function should also delete related Firestore data and any other stored personal data. Reauthentication may be required by Firebase.
- Never publish service-account keys or admin credentials in frontend files.

## Brand/contact details
Weatey International Group  
Email: weateykweku7@gmail.com  
WhatsApp: +233 553 688 108  
Website: https://trustyourself.com
