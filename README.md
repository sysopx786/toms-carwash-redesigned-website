# Tom’s Car Wash redesign

## Google Reviews update

The site now has seven pages, including reviews.html. All 192 entries in the supplied Google Reviews text file are imported, with 98 written reviews and 98 owner responses. Search, supplied-order/A–Z sorting, content filters and 12-entry pagination run locally; without JavaScript all records remain readable. The homepage has a compact verified Google rating shortcut directly above the wash packages, plus a detailed Google rating summary with the first three supplied entries below.

`reviews.py` parses `content/google-reviews-source.txt`; `content/google-reviews.json` is a readable audit copy. Rebuild with `python reviews.py` then `python build.py` after updating the snapshot. Do not run the one-time integration script again. The supplied file lacks star ratings, avatars, individual review/profile URLs and actual photo files. Those are not invented. One truncated review is flagged and 94 entries without text are retained. Dates are quoted as captured, not converted to guessed calendar dates. No Google API or live synchronization is configured.

As checked against the live Tom’s Carwash Google Maps profile on October 29, 2026, the rating summary shows 4.4 stars across 192 reviews: 121 five-star, 41 four-star, 17 three-star, 6 two-star and 7 one-star reviews. The supplied individual-review text does not contain star ratings, so ratings are not fabricated for those cards. The homepage’s separate Write a Google review button uses the Google place ID link and was verified to open the review dialog for the Royersford business. Read links open its Google Maps listing. The Google multicolor wordmark is loaded from Google’s own branding image URL. Official Google Maps attribution artwork is copied unmodified from https://developers.google.com/static/maps/documentation/images/Google_Maps_Attribution_Assets.zip and displayed with the attribution guidance at https://developers.google.com/maps/documentation/places/web-service/policies .

## UX strategy

The experience starts with a cinematic, navy-and-cyan introduction anchored in the original Tom’s identity. Visitors immediately learn that the automatic wash is touchless, the business is open 24/7, and prices start at $9. A four-package comparison appears before the service grid so a driver can choose a wash without digging through marketing copy. The bento layout then distinguishes the automatic exterior wash, hands-on self-serve bays, interior-care equipment and finishing supplies.

Directions are the primary conversion because the confirmed business is a drive-up car wash. Calls and email support questions, while the verified Wash Club portal serves returning customers. Heritage, original brand assets and direct social/review links build trust without fictional staff, ratings or promises. FAQs distinguish ceramic wash protection from installed coating and self-service tools from staffed detailing. Accessible disclosure controls and motion preferences keep the experience usable on phones and for motion-sensitive visitors.

## Files and editing

- `dist/` is the complete deployable static website: six HTML pages, CSS, JavaScript, local image assets, sitemap, robots and host headers.
- `build.py` is the source generator. Update content here and run `python build.py` to regenerate HTML.
- `dist/styles.css` and `dist/app.js` are hand-authored production assets, using plain CSS rather than a runtime Tailwind dependency. No Node dependencies or client framework is needed.
- `validate.py` checks internal pages/assets/anchors, H1s, alt attributes, duplicate IDs, structured data and package prices.
- `.openai/hosting.json` binds the private Sites deployment.
- `ASSET-PROMPTS.md` contains the requested four asset briefs.
- `RESEARCH.md` records sources, conflicts and how all supplied files were used.

## Preview and deployment

Run `python -m http.server 4174 --directory dist` and open localhost:4174. No build step is required to host the existing `dist` directory. For Netlify Drop, unzip the static ZIP and drop its contents/folder so index.html is at the deployment root. For Vercel, select Other, no build command, and use the static directory as the output. The ZIP contains only deployable site files, no credentials.

Before changing to another domain, update ORIGIN in build.py, rebuild, and recheck canonicals, social metadata, sitemap and robots. Private Sites access prevents public search indexing; structured data and crawler files do not override access controls. Search Console and a custom domain were not configured.

## Motion and media

The active hero is an optimized generated WebP still with scroll-responsive transform. Cursor depth uses a small damped animation on pointer devices. Day/night accents follow the visitor’s local time. Reduced-motion, Save-Data where available, low battery where available and the explicit motion toggle disable effects. Battery APIs do not reliably reveal OS low-energy mode.

Actual video generation was attempted through Higgsfield and rejected: Plus plan or higher required. No video job was returned. A real MP4 is therefore NOT included and video scrubbing is NOT runtime-verified. To enable it, add an approved fast-start H.264 MP4 to dist/assets/hero.mp4, and add `data-src="assets/hero.mp4"` to #hero-video in build.py. app.js loads it only when appropriate and maps scroll progress to playback time, keeping the still on load failure. Test seeking on Safari/iOS and Android before release.

Authentic crew footage was not supplied or accessible. The trust section currently uses the supplied logo and direct Facebook/review links. Do not label AI-generated people as the actual crew. Replace or extend this section with owner-approved documentary footage when available. The hero’s illustrative origin is disclosed on the page and privacy/media page.

## Release checks

See RELEASE-CHECKS.md for the latest tested state. Physical-device checks, external booking/club transactions, public indexing, a real video and authentic crew loops remain separate from source and deployment checks.
