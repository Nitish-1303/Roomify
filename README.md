# Roomify

A meeting-room booking demo built with React. Open it, pick a room, send a request and switch to the admin view to approve it. No account or backend setup is needed for the default demo.

## Try the flow

1. Browse five sample rooms and filter by capacity or time.
2. Request a future time slot.
3. Open My bookings to see the pending request.
4. Choose Review as admin, then approve or decline it.
5. Choose View as member to see the result.

All rooms and people are sample data. Bookings stay in this browser's local storage; they are not real reservations. Reset demo restores the sample bookings. This is not a shared, multi-user service. Room photographs are illustrative.

## Frontend

```bash
cd frontend
npm ci
npm start
```

Demo mode is on by default. A production build is static:

```bash
CI=true npm run build
```

For Vercel, use root `frontend`, build command `npm run build`, and output directory `build`. The included rewrite supports refreshing nested routes. No API URL or secret is needed for demo mode. Leave `REACT_APP_DEMO` unset or set it to `true`.

## Optional API

The Express/MongoDB backend remains in `backend/` as separate development work. It is not used by the demo. To use a real API, set `REACT_APP_DEMO=false` and `REACT_APP_API_URL` before building. The backend security and test PRs must be reviewed before treating that API as production-ready. Do not use sample demo credentials for real accounts.

## Checks

The frontend is checked with a CI-mode production build and browser tests covering member requests, reload persistence, admin approval and member status. The demo flow makes no backend requests. The backend has its own separate test work; the static demo does not imply that a live API has been deployed.
