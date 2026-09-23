# Firebase Security Specification & Invariants

## Data Invariants
1. **User Identity Invariant**: A user profile at `/users/{userId}` can only be created/updated by the authenticated user whose `request.auth.uid == userId`, or by an admin.
2. **Booking Ownership Invariant**: A booking can only be read or listed by the user who owns it (`resource.data.userId == request.auth.uid`) or by an admin (`isAdmin()`).
3. **Admin Privilege Invariant**: Admin operations are restricted to `lucas.ferreyra@gmail.com` with `email_verified == true` or documented admin records in `/admins/$(request.auth.uid)`.
4. **Lead Ingestion Invariant**: Public visitors can create leads with strict field size and schema limits. Only admins can read, list, or update leads.
5. **Schedule & Blocked Dates Invariant**: Read is open to visitors so the booking calendar functions in real-time. Modifications are strictly gated to admins.
6. **Default-Deny Catch-All**: All unmapped paths are explicitly blocked (`allow read, write: if false`).

## Dirty Dozen Payloads (Rejection Targets)
1. Write to `/users/victim_id` with `request.auth.uid = attacker_id` -> PERMISSION_DENIED
2. Write to `/bookings/any` without authentication -> PERMISSION_DENIED
3. Read all `/bookings` collection with `allow list` without matching `userId` or admin status -> PERMISSION_DENIED
4. Update booking `status` to `confirmada` as non-admin regular user -> PERMISSION_DENIED
5. Modify `createdAt` on an existing booking -> PERMISSION_DENIED
6. Write lead with oversized string (>1000 chars payload injection) -> PERMISSION_DENIED
7. Modify `/blockedDates/{dateId}` as regular user -> PERMISSION_DENIED
8. Modify `/settings/schedule` as regular user -> PERMISSION_DENIED
9. Spoof admin email without `email_verified: true` -> PERMISSION_DENIED
10. Inject document ID with special characters or invalid ID format -> PERMISSION_DENIED
11. Inject arbitrary unexpected fields into `bookings` -> PERMISSION_DENIED
12. Attempt to read other users' leads without admin privileges -> PERMISSION_DENIED
