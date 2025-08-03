import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        {isLogin ? <LoginForm /> : <SignupForm />}

<div className="mt-4 text-center text-sm">
  {isLogin ? (
    <p>
      Not registered?{" "}
      <button
        onClick={() => setIsLogin(false)}
        className="text-blue-600 font-medium hover:underline"
      >
        Sign up
      </button>
    </p>
  ) : (
    <p>
      Already registered?{" "}
      <button
        onClick={() => setIsLogin(true)}
        className="text-blue-600 font-medium hover:underline"
      >
        Log in
      </button>
    </p>
  )}
</div>

      </div>
    </div>
  );
}
