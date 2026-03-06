# IVC Backend Server

The backend for the Innovators & Visionaries Club (IVC) platform is built with Node.js and Express. It provides a secure API for serving club data, managing member applications, and handling administrative tasks.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Validation**: Zod
- **Security**: 
  - `helmet` (Secure HTTP headers)
  - `cors` (Restricted origins)
  - `express-rate-limit` (Anti-spam and brute-force protection)
  - `crypto` (HMAC-SHA256 for secure tokens)
- **File Handling**: Multer (Memory storage)

---

## API Documentation

### Authentication
- `POST /api/admin/login` - Authenticate admin with a password.
- `POST /api/profile/login` - Authenticate member access with a profile key.
- `GET /api/admin/verify` - Verify admin session token.
- `GET /api/profile/verify` - Verify profile session token.

### Data Retrieval
- `GET /api/events` - Returns a list of upcoming club events.
- `GET /api/projects` - Returns a list of active club projects.
- `GET /api/approved-members` - Returns a list of members with 'approved' status.

### Member Applications
- `POST /api/member-request` - Submit a new member application.
  - **Auth**: Requires a valid profile session token.
  - **Body**: Form-data containing name, email, role, department, year, bio, linkedin, github.
  - **Files**: Profile photo (processed via Multer and uploaded to Supabase).

### Administrative Actions
- `GET /api/admin/requests` - Retrieve all member applications (Admin only).
- `PATCH /api/admin/requests/:id/:action` - Approve or reject an application (Admin only).
- `DELETE /api/admin/requests/:id` - Delete an application (Admin only).

---

## Security Architecture

1.  **Token-Based Auth**: Uses HMAC-SHA256 signed tokens for secure session management without external dependencies.
2.  **Rate Limiting**: Multiple tiers of rate limiting to protect sensitive endpoints like login and submissions.
3.  **Input Validation**: All incoming data is validated against strict Zod schemas to prevent injection and malformed data.
4.  **Secure Storage**: Membership data and photos are stored securely in Supabase with public URL generation for images.
5.  **CORS Policy**: Configured to only allow requests from the official frontend domain in production.

---

## Local Development

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment:
   Create a `.env` file with `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`, `PROFILE_PASSWORD`, and `ADMIN_SECRET`.
4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

