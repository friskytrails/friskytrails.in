## Unused JS/CSS Audit Report (Evidence-Based)

### How this report was generated
1. **Unused JS (properly)**
   - Ran ESLint with focus on unused identifiers using:
     - `eslint src backend --rule 'no-unused-vars:error' --rule 'no-undef:off' --rule 'react/prop-types:off' --rule 'react/no-unescaped-entities:off' --rule 'react-hooks/exhaustive-deps:off' --rule 'react-refresh/only-export-components:off'`
   - This gives an exact list of “defined but never used” / unused imports / unused variables.
2. **Unused CSS selectors**
   - Checked custom selectors by searching the repo with `rg` (ripgrep) for each selector/class name (e.g. `blog-content`, `animate-marquee`, `quill-wrapper`) to see whether they appear in JSX/HTML.
3. **Potentially unused npm packages (static scan)**
   - Performed a static string scan over `src/` + `backend/` to see which dependencies appear in code as import/require paths.
   - This is “potentially unused” only; it must be confirmed before uninstall.

### Unused JS found (Frontend)
- `src/pages/About.jsx`
  - Unused: `Jointeam`, `FortImage`, `showJointeam`, `toggleJointeam`
- `src/Productpage/ItineraryTimeline.jsx`
  - Unused: default `React` import
- `src/Productpage/PackageCard.jsx`
  - Unused import: `useEffect`
- `src/components/BookingModal.jsx`
  - Unused: `response` variable
- `src/components/LoginModal.jsx`
  - Unused: `otpSent` state
- `src/components/Modal.jsx`
  - Unused: unused event param `e` in `handleOptionClick`
- `src/context/AuthContext.jsx`
  - Unused: `catch (error)` binding where `error` isn’t referenced
- `src/sections/BusSer.jsx`
  - Unused: `HillImage` import
- `src/sections/FlightsSer.jsx`
  - Unused: `HillImage` import
- `src/admin/Dashboard.jsx`
  - Unused imports/state: `getCurrentUser`, `NotFound`, and state vars `isAdmin`, `isAllowed`, `loading`

### Unused CSS selectors found (Repo-wide search)
- `src/index.css`
  - `.animate-marquee` (no usage found in repo)
- `src/index.css`
  - `.blog-heading` found but only appears in one component path (`src/components/Blogleft.jsx`)
- `src/styles/Class.css`
  - No “clearly unused” custom selectors were confirmed from usage search beyond `quill-wrapper`/`quill-controls`/etc which are referenced by the Quill editor component.

### Potentially unused npm packages (STATIC - not confirmed)
Potentially unused packages found by static scan:
- `@auth0/auth0-react`
- `@gsap/react`
- `@hugeicons/react`
- `@tailwindcss/line-clamp`
- `@tiptap/react`
- `@tiptap/starter-kit`
- `@types/react`
- `@types/react-dom`
- `autoprefixer`
- `express-session`
- `jodit-react`
- `js-cookie`
- `jwt-decode`
- `lodash-es`
- `postcss`
- `quill-image-resize-module-react`
- `serverless-http`

### Cleanup status
- Phase 1 completed: safe unused-JS removals (no rendering logic changes intended).

