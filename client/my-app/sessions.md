# Understanding Authentication Sessions in MERN

This document outlines how sessions are implemented, configured, and validated within this MERN stack application.

## 1. Pre-work & Configuration

To enable sessions, several steps are required on both the client and server sides to ensure cookies can be stored and transmitted correctly across different ports.

### Server-Side Pre-work
- **Dependencies**: The `express-session` package must be installed.
- **Session Middleware**: It must be configured in `server.js` before your routes.
  ```javascript
  app.use(
    session({
      secret: "super-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Prevents client-side JS from reading the cookie
      },
    })
  );
  ```
- **CORS Configuration**: Because the client (Next.js) runs on port `3000` and the server (Express) on port `5000`, CORS must explicitly allow credentials.
  ```javascript
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true, // Crucial for accepting cookies
    })
  );
  ```

### Client-Side Pre-work
- **Axios Configuration**: Any HTTP request that involves authentication (logging in, registering, or checking session status) must include `withCredentials: true`. This tells the browser to include the session cookie.
  ```javascript
  const response = await axios.post("http://localhost:5000/login", data, {
    withCredentials: true 
  });
  ```

---

## 2. Registering and Logging In (Session Creation)

When a user successfully registers or logs in, a session is established. 

1. **Authentication**: The server checks the credentials (via database lookup and `bcrypt.compare`).
2. **Session Assignment**: If successful, the server assigns user data to `req.session.user`:
   ```javascript
   req.session.user = {
       id: user._id,
       email: user.email,
   };
   ```
3. **Cookie Creation**: `express-session` intercepts the response and automatically adds a `Set-Cookie` header. The browser receives this and stores a session ID cookie (usually named `connect.sid`).

---

## 3. Session Check (Protecting Routes)

To prevent unauthenticated users from viewing secure pages (like the Home page), a check is performed when they navigate to that page.

### The Server Check Route
An endpoint is created to verify if the incoming request contains a valid session cookie.
```javascript
app.get("/auth-check", (req, res) => {
    // If the session exists and has a user object attached
    if (req.session && req.session.user) {
        return res.status(200).json({
            authenticated: true,
            user: req.session.user
        });
    } else {
        return res.status(401).json({
            authenticated: false,
            message: "Not authenticated"
        });
    }
});
```

### The Client Verification
When a user visits a protected Next.js page (e.g., `src/app/home/page.js`), the client immediately asks the server if the session is valid:

1. A `useEffect` hook triggers on mount.
2. An Axios `GET` request is sent to `/auth-check` with `withCredentials: true`.
3. If the server responds with a `200 OK` (meaning the session exists), the Next.js component allows the user to see the page and renders their data.
4. If the server responds with an error or `401 Unauthorized`, the client catches the error and uses Next.js `useRouter` to smoothly redirect the user back to `/login`.

```javascript
// Example Client Verification Flow
useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth-check", {
                withCredentials: true
            });
            if (response.data.authenticated) {
                setUser(response.data.user); // Session is valid
            }
        } catch (error) {
            router.push("/login"); // Session invalid or missing, redirect!
        }
    };
    checkAuth();
}, [router]);
```
