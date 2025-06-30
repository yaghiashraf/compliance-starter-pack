export const genCookieScript = (businessName: string): string => {
  return `
/* 
 * Compliance Starter Pack: Cookie Banner v1.0
 * 
 * This is a lightweight, dependency-free JavaScript solution for a cookie consent banner.
 * It uses localStorage to remember the user's choice, avoiding the need to set a cookie
 * just to track consent.
 *
 * Installation:
 * 1. Add this script to your website's assets.
 * 2. Include it just before the closing </body> tag:
 *    <script src="/path/to/cookie.js"></script>
 */
(function() {
    'use strict';

    // --- CONFIGURATION ---
    const COOKIE_CONSENT_KEY = 'cookie_consent_status';
    const BANNER_POSITION = 'bottom'; // 'top' or 'bottom'
    const BUSINESS_NAME = '${businessName.replace(/'/g, "\\'")}';

    // If consent is already given, do nothing.
    try {
        if (localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted') {
            return;
        }
    } catch (e) {
        console.warn('Could not access localStorage. Cookie banner will be shown on every visit.');
    }

    // --- STYLES ---
    const styles = 
        '#cookie-banner {' +
            'position: fixed;' +
            'left: 0;' +
            'right: 0;' +
            BANNER_POSITION + ': 0;' +
            'background-color: #1f2937;' +
            'color: #f9fafb;' +
            'padding: 1rem;' +
            'z-index: 10000;' +
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
            'font-size: 14px;' +
            'line-height: 1.5;' +
            'box-shadow: 0 -2px 10px rgba(0,0,0,0.2);' +
            'display: flex;' +
            'align-items: center;' +
            'justify-content: space-between;' +
            'flex-wrap: wrap;' +
            'gap: 1rem;' +
        '}' +
        '#cookie-banner-text {' +
            'flex-grow: 1;' +
            'min-width: 280px;' +
        '}' +
        '#cookie-banner-text a {' +
            'color: #60a5fa;' +
            'text-decoration: underline;' +
        '}' +
        '#cookie-banner-actions {' +
            'display: flex;' +
            'gap: 0.75rem;' +
            'flex-shrink: 0;' +
        '}' +
        '.cookie-banner-btn {' +
            'border-radius: 0.375rem;' +
            'padding: 0.5rem 1rem;' +
            'font-weight: 500;' +
            'cursor: pointer;' +
            'border: 1px solid transparent;' +
            'transition: background-color 0.2s;' +
        '}' +
        '.cookie-banner-btn.accept {' +
            'background-color: #22c55e;' +
            'color: #ffffff;' +
        '}' +
        '.cookie-banner-btn.accept:hover {' +
            'background-color: #16a34a;' +
        '}' +
        '.cookie-banner-btn.decline {' +
            'background-color: #4b5563;' +
            'color: #ffffff;' +
        '}' +
        '.cookie-banner-btn.decline:hover {' +
            'background-color: #374151;' +
        '}';

    // --- HTML ---
    const bannerHTML = 
        '<div id="cookie-banner-text">' +
            '<span>We use cookies to improve your experience. By using ' + BUSINESS_NAME + ', you accept our use of cookies.</span>' +
            '<a href="/policy.html" target="_blank" rel="noopener noreferrer">Learn more</a>.' +
        '</div>' +
        '<div id="cookie-banner-actions">' +
            '<button id="cookie-decline-btn" class="cookie-banner-btn decline">Decline</button>' +
            '<button id="cookie-accept-btn" class="cookie-banner-btn accept">Accept</button>' +
        '</div>';

    // --- FUNCTIONS ---
    function showBanner() {
        // Add styles to the head
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Create and append banner
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = bannerHTML;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept-btn').addEventListener('click', handleAccept);
        document.getElementById('cookie-decline-btn').addEventListener('click', handleDecline);
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.remove();
        }
    }

    function handleAccept() {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        } catch (e) {
            // Silently fail if localStorage is not available
        }
        hideBanner();
        // Optional: Dispatch a custom event that other scripts can listen for
        document.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
    }

    function handleDecline() {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        } catch (e) {
            // Silently fail
        }
        hideBanner();
        // Optional: Dispatch a custom event
        document.dispatchEvent(new CustomEvent('cookieConsentDeclined'));
    }

    // --- INITIALIZATION ---
    // Wait for the DOM to be fully loaded before showing the banner
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
    } else {
        showBanner();
    }

})();
`;
};