import React from 'react';

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
      <p>If you did not receive the email, please check your spam folder or <b>resend the verification email</b> from your profile page.</p>
    </div>
  );
};

export default VerifyEmailPage; 