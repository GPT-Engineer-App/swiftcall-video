import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login, forgetPassword } from '../../services/authService';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/call');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword(email);
      toast.success('Password reset instructions sent to your email.');
      setIsForgotPassword(false);
    } catch (error) {
      console.error('Forgot password request failed:', error);
      toast.error('Failed to send password reset instructions. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isForgotPassword ? 'Forgot Password' : 'Login'}
        </h2>
        {!isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Login</Button>
            <p className="mt-2 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Reset Password</Button>
            <p className="mt-2 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </p>
          </form>
        )}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
