export const genAccessibilityScript = (): string => {
  return `
/* 
 * Compliance Starter Pack: Accessibility Widget v1.0
 * 
 * This script is a lightweight, dependency-free accessibility widget.
 * It adds controls for font size adjustment, a high-contrast mode,
 * and a "Skip to Content" link for keyboard users.
 *
 * Installation:
 * 1. Add this script to your website's assets.
 * 2. Include it just before the closing </body> tag:
 *    <script src="/path/to/accessibility.js"></script>
 * 3. Ensure your main content area has an id of "main-content".
 *    <main id="main-content">...</main>
 */
(function() {
    'use strict';

    // --- CONFIGURATION ---
    const WIDGET_POSITION = 'bottom-right'; // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    const ICON_COLOR = '#ffffff';
    const BACKGROUND_COLOR = '#18181b';
    const HIGH_CONTRAST_CLASS = 'high-contrast';
    const SKIP_LINK_TARGET_ID = 'main-content';

    // --- STATE ---
    let currentFontSize = 100; // in percent
    let isHighContrast = false;

    // --- HELPERS ---
    function applyStyles() {
        document.documentElement.style.fontSize = currentFontSize + '%';
        if (isHighContrast) {
            document.documentElement.classList.add(HIGH_CONTRAST_CLASS);
        } else {
            document.documentElement.classList.remove(HIGH_CONTRAST_CLASS);
        }
        savePreferences();
    }

    function savePreferences() {
        try {
            localStorage.setItem('accessibilityPrefs', JSON.stringify({
                fontSize: currentFontSize,
                highContrast: isHighContrast
            }));
        } catch (e) {
            console.warn('Could not save accessibility preferences to localStorage.');
        }
    }

    function loadPreferences() {
        try {
            const prefs = JSON.parse(localStorage.getItem('accessibilityPrefs'));
            if (prefs) {
                currentFontSize = prefs.fontSize || 100;
                isHighContrast = prefs.highContrast || false;
                applyStyles();
            }
        } catch (e) {
            console.warn('Could not load accessibility preferences from localStorage.');
        }
    }

    // --- UI CREATION ---
    function createWidget() {
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'accessibility-widget';
        widgetContainer.style.position = 'fixed';
        widgetContainer.style.zIndex = '9999';
        widgetContainer.style.display = 'flex';
        widgetContainer.style.flexDirection = 'column';
        widgetContainer.style.gap = '8px';

        const toggleButton = document.createElement('button');
        toggleButton.setAttribute('aria-label', 'Accessibility Settings');
        toggleButton.style.width = '48px';
        toggleButton.style.height = '48px';
        toggleButton.style.borderRadius = '50%';
        toggleButton.style.backgroundColor = BACKGROUND_COLOR;
        toggleButton.style.border = '1px solid #444';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.display = 'flex';
        toggleButton.style.alignItems = 'center';
        toggleButton.style.justifyContent = 'center';
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + ICON_COLOR + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';

        const controlsPanel = document.createElement('div');
        controlsPanel.id = 'accessibility-controls';
        controlsPanel.style.display = 'none';
        controlsPanel.style.padding = '16px';
        controlsPanel.style.backgroundColor = BACKGROUND_COLOR;
        controlsPanel.style.borderRadius = '8px';
        controlsPanel.style.border = '1px solid #444';
        controlsPanel.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        controlsPanel.style.width = '240px';

        // Font Size Controls
        const fontControlHtml = 
            '<div style="color: white; font-family: sans-serif; font-size: 14px;">' +
                '<p style="margin: 0 0 8px 0; font-weight: bold;">Text Size</p>' +
                '<div style="display: flex; align-items: center; gap: 8px;">' +
                    '<button id="acc-decrease-font" aria-label="Decrease font size" style="background:#333; color:white; border:1px solid #555; border-radius:4px; padding: 4px 8px; cursor:pointer;">A-</button>' +
                    '<span id="acc-font-size-display" style="flex-grow:1; text-align:center;">' + currentFontSize + '%</span>' +
                    '<button id="acc-increase-font" aria-label="Increase font size" style="background:#333; color:white; border:1px solid #555; border-radius:4px; padding: 4px 8px; cursor:pointer;">A+</button>' +
                '</div>' +
            '</div>';

        // High Contrast Toggle
        const contrastControlHtml = 
            '<div style="color: white; font-family: sans-serif; font-size: 14px; margin-top: 16px;">' +
                '<label style="display: flex; align-items: center; justify-content: space-between; cursor:pointer;">' +
                    '<span style="font-weight: bold;">High Contrast</span>' +
                    '<input type="checkbox" id="acc-contrast-toggle" ' + (isHighContrast ? 'checked' : '') + ' />' +
                '</label>' +
            '</div>';
        
        controlsPanel.innerHTML = fontControlHtml + contrastControlHtml;
        
        widgetContainer.appendChild(controlsPanel);
        widgetContainer.appendChild(toggleButton);
        document.body.appendChild(widgetContainer);

        // Position widget
        const posStyles = {
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' },
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' }
        };
        Object.assign(widgetContainer.style, posStyles[WIDGET_POSITION] || posStyles['bottom-right']);

        // Add event listeners
        toggleButton.addEventListener('click', () => {
            const isHidden = controlsPanel.style.display === 'none';
            controlsPanel.style.display = isHidden ? 'block' : 'none';
        });

        document.getElementById('acc-increase-font').addEventListener('click', () => {
            currentFontSize = Math.min(150, currentFontSize + 10);
            document.getElementById('acc-font-size-display').textContent = currentFontSize + '%';
            applyStyles();
        });

        document.getElementById('acc-decrease-font').addEventListener('click', () => {
            currentFontSize = Math.max(80, currentFontSize - 10);
            document.getElementById('acc-font-size-display').textContent = currentFontSize + '%';
            applyStyles();
        });

        document.getElementById('acc-contrast-toggle').addEventListener('change', (e) => {
            isHighContrast = e.target.checked;
            applyStyles();
        });
    }

    function createSkipLink() {
        if (!document.getElementById(SKIP_LINK_TARGET_ID)) return;

        const skipLink = document.createElement('a');
        skipLink.href = '#' + SKIP_LINK_TARGET_ID;
        skipLink.textContent = 'Skip to main content';
        skipLink.style.position = 'absolute';
        skipLink.style.left = '-9999px';
        skipLink.style.top = 'auto';
        skipLink.style.width = '1px';
        skipLink.style.height = '1px';
        skipLink.style.overflow = 'hidden';
        skipLink.style.zIndex = '99999';
        skipLink.style.padding = '1em';
        skipLink.style.backgroundColor = '#000';
        skipLink.style.color = '#fff';
        skipLink.style.textDecoration = 'none';

        skipLink.addEventListener('focus', () => {
            skipLink.style.left = '10px';
            skipLink.style.top = '10px';
            skipLink.style.width = 'auto';
            skipLink.style.height = 'auto';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.left = '-9999px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    function addHighContrastStyles() {
        const style = document.createElement('style');
        style.textContent = 
            '.' + HIGH_CONTRAST_CLASS + ' {' +
                'background-color: #000 !important;' +
                'color: #fff !important;' +
            '}' +
            '.' + HIGH_CONTRAST_CLASS + ' a {' +
                'color: #ffff00 !important;' +
            '}' +
            '.' + HIGH_CONTRAST_CLASS + ' img,' +
            '.' + HIGH_CONTRAST_CLASS + ' video,' +
            '.' + HIGH_CONTRAST_CLASS + ' svg {' +
                'filter: grayscale(100%) contrast(200%) !important;' +
            '}' +
            '.' + HIGH_CONTRAST_CLASS + ' * {' +
                'background-color: inherit !important;' +
                'color: inherit !important;' +
                'border-color: #fff !important;' +
            '}';
        document.head.appendChild(style);
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        addHighContrastStyles();
        createSkipLink();
        createWidget();
        loadPreferences();
    });

})();
`;
};