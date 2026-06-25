# Security Specification for Ideathonix AI

## 1. Data Invariants
- **User profiles (`/users/{userId}`)**:
  - The document ID (`userId`) must exactly match `request.auth.uid`.
  - The email field must match `request.auth.token.email`.
  - Users cannot set their own tier to `"premium"` (defaults to `"free"` or verified server value).
  - Only authenticated and email-verified users can create/update profiles (for verified flow, we allow google-sign-in users which are verified by default, but we enforce `request.auth.token.email_verified == true`).

- **Generated Ideas (`/ideas/{ideaId}`)**:
  - The `userId` must equal `request.auth.uid`.
  - The document must only be readable, updatable, and deletable by its owner (`userId == request.auth.uid`).
  - `createdAt` must be strictly set to `request.time` during creation.
  - `updatedAt` must be strictly set to `request.time` during updates.
  - Optional/Required fields must have type and size constraints to prevent Denial-of-Wallet attacks.

---

## 2. The "Dirty Dozen" Rogue Payloads
Here are 12 specific rogue payloads trying to violate security rules:

1. **Payload 1 (Identity Spoofing):** Unauthenticated client trying to create a user profile.
2. **Payload 2 (Identity Theft):** Authenticated user `user_A` trying to write a profile at `/users/user_B`.
3. **Payload 3 (Privilege Escalation):** Authenticated user trying to update their own tier to `'premium'`.
4. **Payload 4 (Profile Theft):** User `user_A` trying to read `/users/user_B`.
5. **Payload 5 (Unauthenticated Gen):** Unauthenticated client attempting to write to `/ideas/idea_1`.
6. **Payload 6 (Relational Hijack):** User `user_A` trying to save an idea with `userId: 'user_B'`.
7. **Payload 7 (Oversized ID Poisoning):** Saving an idea with an ID of 1000 characters or containing special characters to corrupt lookups.
8. **Payload 8 (Data Tampering):** User `user_B` trying to edit or read User `user_A`'s idea at `/ideas/idea_A`.
9. **Payload 9 (Timestamp Spoofing):** Creating an idea with a client-supplied past timestamp instead of `request.time`.
10. **Payload 10 (Immutability Violation):** Updating an idea and changing the original owner `userId` or `createdAt`.
11. **Payload 11 (Blanket Collection Scrape):** Querying all ideas without filtering by `userId == request.auth.uid`.
12. **Payload 12 (Unauthorized Deletion):** User `user_B` attempting to delete User `user_A`'s saved idea.

---

## 3. Test Runner (Conceptual Rules Validation)
A complete testing suite (e.g., `firestore.rules.test.ts`) would execute these cases using the `@firebase/rules-unit-testing` framework, asserting `PERMISSION_DENIED` on all twelve payloads, and `ALLOWED` for valid, authenticated owners who follow the schema guidelines.
