
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/api/client';
import RoomCardSkeleton from '@/components/RoomCardSkeleton';
import IndexSkeleton from '@/components/IndexSkeleton';


// const Login = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
//   const [signupData, setSignupData] = useState({ 
//     name: '', 
//     email: '', 
//     password: '', 
//     confirmPassword: '', 
//     phone: '',
//     terms: false 
//   });

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Login attempt:', loginData);
    
//     // Store user info in localStorage for demo purposes
//     localStorage.setItem('user', JSON.stringify({ 
//       name: 'Welcome User', 
//       email: loginData.email,
//       isLoggedIn: true 
//     }));
    
//     toast.success('Welcome back to Hotel Swagat!');
    
//     // Redirect to home page
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };

//   const handleSignup = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (signupData.password !== signupData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
//     if (!signupData.terms) {
//       toast.error('Please accept the terms and conditions');
//       return;
//     }
//     console.log('Signup attempt:', signupData);
    
//     // Store user info in localStorage for demo purposes
//     localStorage.setItem('user', JSON.stringify({ 
//       name: signupData.name, 
//       email: signupData.email,
//       isLoggedIn: true 
//     }));
    
//     toast.success('Account created successfully! Welcome to Hotel Swagat!');
    
//     // Redirect to home page
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };

//   const handleGuestContinue = () => {
//     console.log('Continuing as guest');
//     toast.success('Continuing as guest. You can create an account later to save your bookings.');
    
//     // Redirect to home page as guest
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false,
  });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await api.post<{ token: string; user: any }>('/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });
      // console.log(user)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ 
              name: user.name, 
              email: user.email,
              phone:user.phone,
              isLoggedIn: true ,
              isAdmin: user.isAdmin,
            }));
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/');
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!signupData.terms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post<{ token: string; user: any }>('/auth/signup', {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        phone: signupData.phone,
      });
      localStorage.setItem('token', token);
      
      localStorage.setItem('user', JSON.stringify({ 
        name: user.name, 
        email: user.email,
        phone:user.phone,
        isLoggedIn: true 
      }));
      toast.success(`Account created! Welcome, ${user.name}!`);
      navigate('/');
      setLoading(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleGuestContinue = () => {
    toast.success('Continuing as guest. You can create an account later to save your bookings.');
    navigate('/');
  };
  if (loading) {
    return <IndexSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hotel-cream via-white to-hotel-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-hotel-blue">Hotel Swagat</h1>
            </div>
          </Link>
          <p className="text-gray-600">Welcome to your home away from home</p>
        </div>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="text-center text-hotel-blue">Access Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        className="pl-10"
                        placeholder="your.email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10"
                        placeholder="Your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember"
                        checked={loginData.remember}
                        onCheckedChange={(checked) => setLoginData({...loginData, remember: checked as boolean})}
                      />
                      <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        className="pl-10"
                        placeholder="Your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        className="pl-10"
                        placeholder="your.email@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 12345 67890"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms"
                      checked={signupData.terms}
                      onCheckedChange={(checked) => setSignupData({...signupData, terms: checked as boolean})}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Continue as Guest */}
            <div className="mt-6 pt-6 border-t">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleGuestContinue}
                type="button"
              >
                Continue as Guest
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                You can create an account later to save your bookings
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">
            ← Back to Hotel Swagat
          </Link>
        </div>
      </div>
    </div>
  );
};


