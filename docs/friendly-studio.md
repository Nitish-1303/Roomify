# Friendly studio frontend

The home screen, navigation, room cards and booking dialog use the peach/lilac theme and round-table mark. The mark is shared with the SVG favicon. Quicksand fonts and illustrative room photographs are bundled locally, with font licence and photo source notes.

The page still uses the existing API and auth context. Room names, capacities, locations and amenities come from the API. Photos are labelled illustrative and do not claim to depict the actual rooms. A successful submission creates a booking request, not an instant approved booking.

## Deployment and existing branches

This redesign branches directly from main. It does not change auth, backend security, API configuration or the frontend demo adapter. Without a hosted API or the demo adapter from PR #6, it still needs a backend and login.

PR #2 and PR #6 also touch the room page or app shell. When merging them, retain the cleanup/auth/demo API changes from those branches and the room-page UI here. `Rooms.js` has no direct dependency on the demo adapter and can use the adapter through the unchanged `api` import. Do not restore the old homepage's customer statistics or testimonials.

## Verification

A production build was inspected at desktop and mobile widths. Local browser-only fixture responses were used for screenshots and interaction checks; they are not included in the app. They do not prove that a live backend or production login works.

Checked capacity filtering, date/time validation, available-now filtering, calendar switching, booking request payload/confirmation, and API failure display. The main branch has unrelated ESLint warnings; an ordinary production build succeeds with warnings, while CRA's CI=true build needs the existing cleanup fixes.

Assets are self-contained: room photographs use SVG wrappers around the original JPEG bytes and the licensed Quicksand fonts are embedded in studio.css. This keeps runtime requests local.
