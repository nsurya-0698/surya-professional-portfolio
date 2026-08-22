# Private Web Analytics Design

## Goal

Measure portfolio visits privately without adding a visible counter, application backend, or database that the portfolio owner must operate.

## Service

Use Cloudflare Web Analytics with the existing GitHub Pages hostname. The site remains hosted by GitHub Pages and does not move DNS or content to Cloudflare.

## Integration

Add Cloudflare's asynchronous module beacon to the production HTML using the site token created for `nsurya-0698.github.io`. The token is a public site identifier embedded in the shipped page, not an account credential.

The integration must:

- remain invisible in the interface;
- avoid blocking React rendering;
- collect only on the registered production hostname;
- rely on Cloudflare's built-in single-page application measurement;
- avoid custom visitor identifiers, cookies, local storage, or fingerprinting;
- require no portfolio database or API server.

## Data flow

When a production visitor loads the portfolio, the browser downloads Cloudflare's lightweight beacon and sends aggregate visit, page-view, referrer, device, country, browser, operating-system, page-load, and Core Web Vitals data to Cloudflare. The portfolio owner views the aggregated reports in the private Cloudflare dashboard.

## Failure behavior

Analytics is nonessential. If an ad blocker, privacy extension, network policy, or Cloudflare outage blocks the beacon, the portfolio must continue to render and behave normally. No error message is shown to the visitor.

## Verification

- Lint and build the production bundle.
- Confirm the production HTML contains exactly one beacon and the correct site token.
- Confirm localhost does not produce an accepted analytics event for the production hostname.
- Confirm no visible interface or layout changes.
- Confirm a fresh page load has no application console errors.
