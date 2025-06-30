import { FormState } from "../App";

const getJurisdictionSpecifics = (jurisdiction: string) => {
    switch (jurisdiction) {
        case "EU":
            return {
                name: "European Union (GDPR)",
                dataController: "Data Controller under the General Data Protection Regulation (GDPR)",
                userRights: `
                    <p>&bull; <strong>The right to access</strong> – You have the right to request copies of your personal data.</p>
                    <p>&bull; <strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</p>
                    <p>&bull; <strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</p>
                    <p>&bull; <strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
                    <p>&bull; <strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</p>
                    <p>&bull; <strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
                    <p>&bull; <strong>The right to withdraw consent</strong> – Where we are relying on consent to process your personal data, you have the right to withdraw your consent at any time.</p>
                `,
                governingLaw: "the laws of the European Union, specifically the General Data Protection Regulation (GDPR).",
                dataRetention: "We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
                legalBasis: "We process your personal data under the following legal bases: (a) Consent, (b) Contract performance, (c) Legal obligation, (d) Vital interests, (e) Public task, (f) Legitimate interests."
            };
        case "Canada":
            return {
                name: "Canada (PIPEDA)",
                dataController: "organization responsible for your information under the Personal Information Protection and Electronic Documents Act (PIPEDA)",
                userRights: `
                    <p>&bull; <strong>The right to know</strong> why we collect, use, or disclose your personal information.</p>
                    <p>&bull; <strong>The right to expect reasonable handling</strong> of your information and not use it for any other purpose without your consent.</p>
                    <p>&bull; <strong>The right to know who is responsible</strong> for protecting your information.</p>
                    <p>&bull; <strong>The right to access</strong> your personal information and ask for corrections.</p>
                    <p>&bull; <strong>The right to complain</strong> about how we handle your information to the Office of the Privacy Commissioner of Canada.</p>
                `,
                governingLaw: "the laws of the Province of Ontario and the federal laws of Canada applicable therein.",
                dataRetention: "We retain personal information only as long as necessary for the identified purposes or as required by law.",
                legalBasis: "We process personal information in accordance with PIPEDA and with appropriate consent or other lawful authority."
            };
        case "UK":
             return {
                name: "United Kingdom (UK GDPR)",
                dataController: "Data Controller under the UK General Data Protection Regulation (UK GDPR)",
                userRights: `
                    <p>&bull; <strong>Your right of access</strong> - You have the right to ask us for copies of your personal information.</p>
                    <p>&bull; <strong>Your right to rectification</strong> - You have the right to ask us to rectify personal information you think is inaccurate.</p>
                    <p>&bull; <strong>Your right to erasure</strong> - You have the right to ask us to erase your personal information in certain circumstances.</p>
                    <p>&bull; <strong>Your right to restriction of processing</strong> - You have the right to ask us to restrict the processing of your personal information in certain circumstances.</p>
                    <p>&bull; <strong>Your right to object to processing</strong> - You have the right to object to the processing of your personal information in certain circumstances.</p>
                    <p>&bull; <strong>Your right to data portability</strong> - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.</p>
                `,
                governingLaw: "the laws of England and Wales.",
                dataRetention: "We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
                legalBasis: "We process your personal data under UK GDPR legal bases including: (a) Consent, (b) Contract, (c) Legal obligation, (d) Vital interests, (e) Public task, (f) Legitimate interests."
            };
        case "Australia":
            return {
                name: "Australia (Privacy Act)",
                dataController: "entity responsible for your data under the Australian Privacy Act 1988",
                userRights: `
                    <p>&bull; <strong>The right to know</strong> why your personal information is being collected, how it will be used and who it will be disclosed to.</p>
                    <p>&bull; <strong>The right to anonymity</strong> to have the option of not identifying yourself, or of using a pseudonym in certain circumstances.</p>
                    <p>&bull; <strong>The right to access</strong> your personal information.</p>
                    <p>&bull; <strong>The right to opt-out</strong> of direct marketing communications.</p>
                    <p>&bull; <strong>The right to correction</strong> to ask for your personal information to be corrected.</p>
                    <p>&bull; <strong>The right to complain</strong> about an organisation or agency covered by the Privacy Act, if you think they have mishandled your personal information.</p>
                `,
                governingLaw: "the laws of New South Wales, Australia.",
                dataRetention: "We retain personal information for as long as necessary for the purposes for which it was collected, or as required by law.",
                legalBasis: "We collect and process personal information in accordance with the Australian Privacy Principles and other applicable laws."
            };
        case "USA":
        default:
            return {
                name: "USA (CCPA/CPRA)",
                dataController: "business that collects consumers' personal information",
                userRights: `
                    <p>Your rights may vary by state. For residents of California, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) provide you with the following rights:</p>
                    <p>&bull; <strong>The right to know</strong> what personal information is being collected about you.</p>
                    <p>&bull; <strong>The right to know</strong> whether your personal information is sold or disclosed and to whom.</p>
                    <p>&bull; <strong>The right to say no</strong> to the sale of personal information.</p>
                    <p>&bull; <strong>The right to access</strong> your personal information.</p>
                    <p>&bull; <strong>The right to correct</strong> inaccurate personal information.</p>
                    <p>&bull; <strong>The right to limit</strong> the use and disclosure of sensitive personal information.</p>
                    <p>&bull; <strong>The right to equal service</strong> and price, even if you exercise your privacy rights (non-discrimination).</p>
                `,
                governingLaw: "the laws of the State of Delaware, United States, without regard to its conflict of law provisions.",
                dataRetention: "We retain personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.",
                legalBasis: "We process personal information based on your consent, performance of a contract, compliance with legal obligations, protection of vital interests, performance of a task carried out in the public interest, or legitimate interests."
            };
    }
};

export const genPolicyHtml = (formData: FormState): string => {
    const { businessName, websiteUrl, jurisdiction, email } = formData;
    const effectiveDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { name: jurisdictionName, dataController, userRights, governingLaw, dataRetention, legalBasis } = getJurisdictionSpecifics(jurisdiction);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy & Terms of Service - ${businessName}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        h1, h2 {
            color: #000;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.5rem;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        a { color: #007bff; }
        .container { padding: 1rem; }
        .last-updated { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Privacy Policy & Terms of Service for ${businessName}</h1>
        <p class="last-updated">Last Updated: ${effectiveDate}</p>

        <h2>Introduction</h2>
        <p>Welcome to ${businessName}. We operate the website located at <a href="${websiteUrl}">${websiteUrl}</a>. This document serves as our combined Privacy Policy and Terms of Service. It governs your access to and use of our services. By using our website, you agree to be bound by these terms and consent to our privacy practices.</p>
        <p>This policy is a general template and may not cover all legal requirements for your specific situation. It is not a substitute for professional legal advice.</p>

        <h1>Privacy Policy</h1>
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ${websiteUrl} (the "Site").</p>

        <h2>1. Personal Information We Collect</h2>
        <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
        <p>We collect Personal Information using the following technologies:</p>
        <p>&bull; "Cookies" are data files that are placed on your device or computer and often include an anonymous unique identifier.</p>
        <p>&bull; "Log files" track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
        <p>Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>

        <h2>2. How Do We Use Your Personal Information?</h2>
        <p>We use the information we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
        <p>&bull; Communicate with you;</p>
        <p>&bull; Screen our orders for potential risk or fraud; and</p>
        <p>&bull; When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>

        <h2>3. Sharing Your Personal Information</h2>
        <p>We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>
        
        <h2>4. Your Rights (${jurisdictionName})</h2>
        <p>${businessName} is the ${dataController}. You have certain rights regarding your personal data. These include:</p>
        ${userRights}
        <p>If you would like to exercise any of these rights, please contact us at <a href="mailto:${email}">${email}</a>.</p>

        <h2>5. Legal Basis for Processing</h2>
        <p>${legalBasis}</p>

        <h2>6. Data Retention</h2>
        <p>${dataRetention}</p>
        <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>

        <h2>7. International Data Transfers</h2>
        <p>Your information may be transferred to and processed in countries other than the country in which you are resident. These countries may have data protection laws that are different from the laws of your country. We take appropriate measures to ensure that your personal data receives an adequate level of protection in the jurisdictions in which we process it.</p>

        <h2>8. Data Security</h2>
        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

        <h2>9. Cookies and Tracking Technologies</h2>
        <p>We use cookies, web beacons, and other tracking technologies to collect information about your browsing activities on our website. You can control the use of cookies at the individual browser level. If you reject cookies, you may still use our website, but your ability to use some features or areas may be limited.</p>

        <h1>Terms of Service</h1>

        <h2>1. Use of Our Service</h2>
        <p>You must be at least 18 years old to use our Service. You agree not to use the Service for any illegal or unauthorized purpose. You are responsible for all your activity in connection with the Service.</p>

        <h2>2. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of ${businessName} and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

        <h2>3. Links To Other Web Sites</h2>
        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by ${businessName}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>

        <h2>4. Limitation Of Liability</h2>
        <p>In no event shall ${businessName}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

        <h2>5. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with ${governingLaw}, without regard to its conflict of law provisions.</p>

        <h2>Changes to This Policy</h2>
        <p>We may update our Privacy Policy and Terms of Service from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this policy periodically for any changes.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or Terms of Service, please contact us by email: <a href="mailto:${email}">${email}</a>.</p>
    </div>
</body>
</html>
`;
};
