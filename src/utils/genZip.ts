import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FormState } from "../App";
import { genPolicyHtml } from "./genPolicy";
import { genCookieScript } from "./genCookieBanner";
import { genAccessibilityScript } from "./genAccessibility";
import { genPdf } from "./genPdf";

const genReadmeHtml = (formData: FormState): string => {
    const { businessName, websiteUrl } = formData;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Installation Instructions - Compliance Starter Pack</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6; color: #e0e0e0; background-color: #0d1117;
            max-width: 800px; margin: 2rem auto; padding: 0 1rem;
        }
        h1, h2 { color: #fff; border-bottom: 1px solid #30363d; padding-bottom: 0.5rem; }
        code {
            background-color: #161b22; color: #c9d1d9; padding: 0.2em 0.4em;
            margin: 0; font-size: 85%; border-radius: 6px; font-family: monospace;
        }
        pre {
            background-color: #161b22; border: 1px solid #30363d; border-radius: 6px;
            padding: 16px; overflow-x: auto;
        }
        .card { background-color: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .note { color: #8b949e; font-size: 0.9em; }
        a { color: #58a6ff; }
    </style>
</head>
<body>
    <h1>Compliance Starter Pack for ${businessName}</h1>
    <p class="note">Generated for: <a href="${websiteUrl}" target="_blank">${websiteUrl}</a></p>

    <div class="card">
        <h2>What's in this ZIP file?</h2>
        <ul>
            <li><strong>policy.html</strong>: Your Privacy Policy and Terms of Service page with business branding.</li>
            <li><strong>policy.pdf</strong>: A PDF version of your policies.</li>
            <li><strong>cookie.js</strong>: A script for a simple cookie consent banner.</li>
            <li><strong>accessibility.js</strong>: A script for a basic accessibility widget.</li>
            <li><strong>readme_install.html</strong>: These installation instructions.</li>
        </ul>
        <p class="note"><strong>Note:</strong> The policy.html file includes Open Graph meta tags for better social media sharing and placeholder favicon links that you should update with your actual business logo.</p>
    </div>

    <div class="card">
        <h2>Step 1: Upload Files</h2>
        <p>Upload the following four files to the root directory of your website. If you have an 'assets' or 'js' folder, you can place the <code>.js</code> files there, but you'll need to adjust the paths in the snippets below.</p>
        <ul>
            <li><code>policy.html</code></li>
            <li><code>policy.pdf</code></li>
            <li><code>cookie.js</code></li>
            <li><code>accessibility.js</code></li>
        </ul>
    </div>

    <div class="card">
        <h2>Step 2: Link to Your Policy Page</h2>
        <p>Add a link to your new policy page in your website's footer. This makes it easy for users to find.</p>
        <pre><code>&lt;a href="/policy.html"&gt;Privacy Policy &amp; Terms&lt;/a&gt;</code></pre>
    </div>

    <div class="card">
        <h2>Step 3: Add Scripts to Your Site</h2>
        <p>Copy and paste the following two lines into your main HTML file (e.g., <code>index.html</code>) right before the closing <code>&lt;/body&gt;</code> tag. It's important to place them at the end of the body so they don't slow down your page load.</p>
        <pre><code>&lt;script src="/cookie.js"&gt;&lt;/script&gt;
&lt;script src="/accessibility.js"&gt;&lt;/script&gt;</code></pre>
        <p class="note">If you placed the scripts in a subfolder (like <code>/js/</code>), update the <code>src</code> path accordingly (e.g., <code>src="/js/cookie.js"</code>).</p>
    </div>
    
    <div class="card">
        <h2>Step 4: Configure Accessibility Widget (Optional)</h2>
        <p>The accessibility widget needs to know what your main content area is to provide a "Skip to Content" link. Make sure your main content container has <code>id="main-content"</code>.</p>
        <pre><code>&lt;main id="main-content"&gt;
  &lt;!-- Your main page content goes here --&gt;
&lt;/main&gt;</code></pre>
    </div>

    <div class="card">
        <h2>Step 5: Add Your Business Logo/Favicon (Recommended)</h2>
        <p>For better branding and social sharing, add your business favicon and logo files to your website root:</p>
        <ul>
            <li><code>favicon.ico</code> - Main favicon (16x16 or 32x32 px)</li>
            <li><code>favicon-32.png</code> - 32x32 PNG favicon</li>
            <li><code>favicon-16.png</code> - 16x16 PNG favicon</li>
            <li><code>apple-touch-icon.png</code> - 180x180 Apple touch icon</li>
            <li><code>favicon-512.png</code> - 512x512 PNG for social sharing</li>
        </ul>
        <p class="note">The policy.html file already includes the proper meta tags for these files. When someone shares your privacy policy, it will show your business logo and proper branding.</p>
    </div>

    <p class="note"><strong>Disclaimer:</strong> This starter pack provides a basic template and is not a substitute for professional legal advice. You are responsible for ensuring your website complies with all applicable laws and regulations for your jurisdiction and business type.</p>
</body>
</html>
`;
};

export const genZip = async (
    formData: FormState,
    setProgress: (progress: number) => void
): Promise<Blob> => {
    const zip = new JSZip();
    
    // 1. Generate Policy HTML
    const policyHtml = genPolicyHtml(formData);
    zip.file("policy.html", policyHtml);
    setProgress(20);
    await new Promise(res => setTimeout(res, 800));

    // 2. Generate Cookie Banner JS
    const cookieScript = genCookieScript(formData.businessName);
    zip.file("cookie.js", cookieScript);
    setProgress(40);
    await new Promise(res => setTimeout(res, 800));

    // 3. Generate Accessibility JS
    const accessibilityScript = genAccessibilityScript();
    zip.file("accessibility.js", accessibilityScript);
    setProgress(60);
    await new Promise(res => setTimeout(res, 800));

    // 4. Generate PDF
    const pdfBytes = await genPdf(policyHtml);
    zip.file("policy.pdf", pdfBytes);
    setProgress(80);
    await new Promise(res => setTimeout(res, 800));

    // 5. Generate README
    const readmeHtml = genReadmeHtml(formData);
    zip.file("readme_install.html", readmeHtml);
    setProgress(95);
    await new Promise(res => setTimeout(res, 600));

    // 6. Create ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    setProgress(100);
    
    return zipBlob;
};

export const downloadZip = (blob: Blob) => {
    saveAs(blob, "starter-pack.zip");
};
