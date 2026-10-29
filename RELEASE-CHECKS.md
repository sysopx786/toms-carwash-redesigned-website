# Release checks — October 29, 2026

## Google Reviews release

- Passed: seven-page local validation, JavaScript syntax, all 192 reviewer records, 98 written reviews and 98 owner replies preserved from the supplied file.
- Passed in local browser: pagination (entries 13–24), searching the final supplied reviewer, expanding an owner response, filtering 98 responses, empty search results, reset and A–Z sorting.
- Verified directly on Google Maps on October 29, 2026: 4.4 stars and 192 reviews, with 121 / 41 / 17 / 6 / 7 reviews for ratings five through one.
- Passed in Google Maps: the read destination resolves to Tom's Carwash at 750 Walnut St, Royersford and shows the same current rating and count.
- Passed in Google: the direct place-ID Write a review link opens the review dialog for the same Royersford business.
- Passed in local browser: homepage rating shortcut is directly before the wash packages; separate Write and Read links are keyboard-accessible anchors; the full reviews summary includes the Google wordmark, Maps mark, gold stars, rating bars and source-count labels.
- Passed: CSS includes phone and narrow-phone breakpoints; no fixed-width review controls or rating bars; image alternatives and screen-reader summary supplied.
- Source limitation: 94 records have no written text, one review is truncated, and individual star ratings, photos and profile URLs are absent. The page explains these gaps; only the current overall Google rating/distribution is shown.
- This is a current snapshot, not a live Google feed. Publication status and live-site confirmation are reported separately.

- Passed: six generated HTML pages; local links, assets and anchor targets; unique IDs; one H1 per page; image alt attributes; valid JSON-LD with prices $9/$11/$14/$16.
- Passed: JavaScript syntax check with node --check.
- Passed: local server HTTP 200.
- Passed: desktop homepage visual review in the browser.
- Passed: phone-width homepage, pricing and FAQ visual review; homepage/FAQ showed no horizontal overflow; FAQ expansion and mobile menu opening worked.
- Passed: no error/warning messages captured in the tested browser tab.
- Implemented: reduced-motion preferences, keyboard-focus styling, skip link, native FAQ disclosure, no-JavaScript navigation fallback, semantic landmarks, responsive layout and scoped comparison-table scrolling.
- Not fully verified: automated accessibility/contrast audit, every keyboard path, browser diversity, all external link destinations and Wash Club transactions.
- Not tested: physical Android/iOS device, battery/Save-Data behavior on actual devices.
- Not available: real hero video; Higgsfield generation rejected because connected account requires Plus or higher. Video seeking integration exists but is untested without footage.
- Not available: authentic crew video loops. Direct Facebook link used as fallback.
- SEO source checks passed; public indexing, Search Console and custom-domain setup not performed. The Sites version is owner-private by default.
- Hosting deployment status is reported separately in the completion message. A successful deployment does not establish public access or search indexing.
- Handover: README, four asset prompts and source/conflict record included.

Owner confirmation before a public business launch: preferred phone number (two published numbers conflict), current on-site prices/payment methods, rights/consent for future crew footage, and destination domain.
