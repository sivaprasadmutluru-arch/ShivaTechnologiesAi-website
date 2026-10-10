export const dynamic = 'force-dynamic';
export const metadata = { title: 'Privacy Policy | Shiva Technologies AI', description: 'How Shiva Technologies AI collects, uses and protects website enquiries and administrator account information.' };

export default function Page() {
  return <>
    <section className="page-hero section">
      <p className="eyebrow">PRIVACY POLICY</p>
      <h1>Your trust.<br /><em>Our responsibility.</em></h1>
      <p>Understand what we collect, why we use it, and the choices available to you.</p>
      <p>Last updated: 10 October 2026</p>
    </section>
    <section className="section prose">
      <h2>1. Who we are and what this policy covers</h2>
      <p>Shiva Technologies AI provides web, mobile, AI and cloud engineering services. This policy covers information handled through this website, its contact form and its administrator workspace. Products we develop for clients may have separate privacy policies.</p>
      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Contact and career enquiries:</strong> your name, email address, optional phone number, selected enquiry category and message, together with a reference number, submission time, consent time and enquiry status.</li>
        <li><strong>Administrator accounts:</strong> email address, password hash, account role and access status, account creation time, invitation records and session information. Passwords are stored as hashes rather than readable passwords.</li>
        <li><strong>Team profiles:</strong> names, roles, biographies and profile image addresses entered by authorised administrators. Published profiles are visible to website visitors.</li>
        <li><strong>Security information:</strong> hashed identifiers derived from network or email information and timestamps used to limit spam and repeated sign-in attempts. Raw IP addresses are not stored in enquiry records. Hosting providers may process IP addresses and other request information in their own logs.</li>
      </ul>
      <p>Please include only information needed for your enquiry. Do not submit passwords, payment card details, government identity documents or sensitive personal information in the message field.</p>
      <h2>3. How we use information</h2>
      <p>We use enquiry details to understand your request, contact you, discuss project requirements and manage follow-up. Career enquiries are used to respond to your interest in working with us. Account information supports sign-in, invitations, access control and website administration. Security information helps protect the website against abuse.</p>
      <p>The contact form asks for your agreement before submission. Submitting an enquiry does not enrol you in a marketing mailing list. This website does not automatically send your enquiries to an AI model.</p>
      <p>When email delivery is configured, we send an acknowledgement to the email address you provide and an enquiry notification to our team. Authorised administrators can also send member invitations by email. These messages are sent through Gmail using shivatechnologiesai@gmail.com. Google processes the recipient address and message content to deliver the email. Messages and copies in recipients’ mailboxes have separate retention from our website database.</p>
      <h2>4. Storage and access</h2>
      <p>The hosted website stores enquiry and administrator records in Cloudflare D1. When running on localhost, records are stored on the computer running the local server; local and hosted records are separate. Authorised administrators can review enquiries and export them as CSV files. Exported copies need to be handled securely by the recipient.</p>
      <p>Service providers supporting hosting, database storage and website delivery may process information to provide those services. Provider infrastructure may be located outside your country. Information may also be disclosed where required by law or necessary to address misuse of the service.</p>
      <h2>5. Cookies and external services</h2>
      <p>Administrator sign-in uses an essential session cookie, named shiva_admin, with an eight-hour lifetime. It enables authenticated access and is cleared when you sign out. Blocking cookies may prevent administrator sign-in.</p>
      <p>No advertising trackers or analytics scripts are currently configured in the website application. Google Fonts loads typefaces from Google and may expose request information, including your IP address, to that provider. Links to WhatsApp, Instagram, Berymo and other external sites are governed by those services’ privacy practices. Contacting us through WhatsApp means information is also handled by WhatsApp.</p>
      <h2>6. How long records are kept</h2>
      <p>Enquiries older than 90 days are excluded from the admin enquiry view and export. The contact form deletes those older database records when it processes a new submission; deletion is not currently scheduled independently. Downloaded exports and provider logs have separate retention arrangements.</p>
      <p>Administrator accounts remain stored until removed. Disabling an account revokes access and sessions but does not erase the account record. Session access expires after eight hours, invitation links expire after 24 hours, and authentication rate-limit records expire after 15 minutes. Expiry prevents their use; expired stored records may remain until cleanup occurs.</p>
      <h2>7. Your choices and privacy requests</h2>
      <p>You can call us instead of using the contact form. To ask about information you submitted, request a copy, correct it, request deletion or withdraw consent for further enquiry follow-up, contact us at <a href="tel:+919381934911">+91 9381934911</a>. Include your enquiry reference if you have one. We may ask for enough information to verify that the request relates to you.</p>
      <p>We will review requests and explain any information that needs to be retained for legal or security reasons. You can use the same contact number to raise a privacy concern or complaint. Withdrawing consent does not undo processing already completed.</p>
      <h2>8. Security</h2>
      <p>The application uses password hashing, role-based access, expiring sessions, input validation and rate limits. On HTTPS deployments, administrator cookies are marked Secure; they are also HttpOnly and SameSite=Lax. These measures reduce risk, but no system can guarantee absolute security. Keep passwords and invitation links private, and sign out on shared devices.</p>
      <h2>9. Children and locally generated files</h2>
      <p>The website is intended for business enquiries and authorised administrators. Children should not submit personal information without a parent or guardian’s involvement. Contact us if a child’s information has been submitted and you want it reviewed or removed.</p>
      <p>The homepage brief builder generates a downloadable file on your device. Its contents are not sent to the enquiry database unless you separately submit them through the contact form.</p>
      <h2>10. Changes and contact</h2>
      <p>We may update this policy when website features or information practices change. The date above identifies the latest revision.</p>
      <p>For privacy questions, contact <strong>Shiva Technologies AI</strong> at <a href="tel:+919381934911">+91 9381934911</a>.</p>
    </section>
  </>;
}
