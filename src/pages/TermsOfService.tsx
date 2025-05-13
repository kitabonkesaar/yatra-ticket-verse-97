import React from "react";

const TermsOfService = () => (
  <div className="container mx-auto py-8 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
    <p className="mb-4">By using Mo Yatra, you agree to the following terms and conditions:</p>
    <ul className="list-disc pl-6 space-y-2 mb-4">
      <li>All bookings are subject to availability and confirmation.</li>
      <li>Payment terms, cancellation, and refund policies are provided at the time of booking.</li>
      <li>We reserve the right to modify or cancel tours due to unforeseen circumstances.</li>
      <li>Users are responsible for providing accurate information during booking.</li>
      <li>Misuse of the platform may result in account suspension or termination.</li>
    </ul>
    <p>For questions, contact us at <a href="mailto:info@moyatra.com" className="text-bharat-orange underline">info@moyatra.com</a>.</p>
  </div>
);

export default TermsOfService; 