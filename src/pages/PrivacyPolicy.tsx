import React from "react";

const PrivacyPolicy = () => (
  <div className="container mx-auto py-8 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4">We value your privacy. This policy explains how we collect, use, and protect your information when you use Mo Yatra.</p>
    <ul className="list-disc pl-6 space-y-2 mb-4">
      <li>We only collect information necessary for booking and communication.</li>
      <li>Your data is never sold or shared with third parties except as required for service delivery.</li>
      <li>All sensitive data is stored securely using industry best practices.</li>
      <li>You can request deletion of your data at any time by contacting us.</li>
    </ul>
    <p>For questions, contact us at <a href="mailto:info@moyatra.com" className="text-bharat-orange underline">info@moyatra.com</a>.</p>
  </div>
);

export default PrivacyPolicy; 