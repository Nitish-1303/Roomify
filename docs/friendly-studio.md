# Friendly studio demo

The rooms page, navigation, booking request dialog and booking-status page use the selected peach/lilac theme and round-table logo. The same logo is the favicon.

The recruiter demo combines the cleanup branch, frontend demo adapter and Friendly studio redesign. Demo mode is enabled by default. It opens as a sample member, so visitors do not need to sign in. The demo controls switch between member and admin review without using a real account.

Sample bookings persist in this browser only. Reset demo restores the seed data. No backend is required or contacted. To use a real API, build with REACT_APP_DEMO=false. Backend source is preserved, not deleted.

Fonts are embedded locally with their licence; room photos are self-contained SVG wrappers around the original JPEG bytes, with photo sources in frontend/public/images/README.txt. They are labelled illustrative rather than actual bookable rooms.
