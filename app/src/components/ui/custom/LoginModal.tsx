import { useState } from 'react';
import { Mail, Phone, User, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/AppContext';

export function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAppStore();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'guest'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = () => {
    if ((loginMethod === 'email' && !email) || (loginMethod === 'phone' && !phone)) return;
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setShowOtp(true);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (!otp) return;
    
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Create user and login
      const userName = name || (loginMethod === 'email' ? email.split('@')[0] : `User${phone.slice(-4)}`);
      login({
        id: Date.now().toString(),
        name: userName,
        email: loginMethod === 'email' ? email : undefined,
        phone: loginMethod === 'phone' ? phone : undefined,
        isGuest: false,
      });
      
      // Close modal after showing success
      setTimeout(() => {
        setIsLoginModalOpen(false);
        resetForm();
      }, 1500);
    }, 1500);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({
        id: Date.now().toString(),
        name: 'Guest',
        isGuest: true,
      });
      setIsLoginModalOpen(false);
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setEmail('');
    setPhone('');
    setOtp('');
    setName('');
    setShowOtp(false);
    setIsSuccess(false);
    setLoginMethod('email');
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    resetForm();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-dark-secondary border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {isSuccess ? (
              <span className="text-cyan">Welcome!</span>
            ) : (
              'Get Started'
            )}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-8 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-cyan" />
            </div>
            <p className="text-white/70">Login successful!</p>
            <p className="text-sm text-white/50">Redirecting...</p>
          </div>
        ) : (
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/30">
              <TabsTrigger 
                value="email" 
                onClick={() => { setLoginMethod('email'); setShowOtp(false); }}
                className="data-[state=active]:bg-cyan data-[state=active]:text-black"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger 
                value="phone"
                onClick={() => { setLoginMethod('phone'); setShowOtp(false); }}
                className="data-[state=active]:bg-cyan data-[state=active]:text-black"
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </TabsTrigger>
              <TabsTrigger 
                value="guest"
                onClick={() => { setLoginMethod('guest'); setShowOtp(false); }}
                className="data-[state=active]:bg-cyan data-[state=active]:text-black"
              >
                <User className="w-4 h-4 mr-2" />
                Guest
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 mt-4">
              {!showOtp ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Your Name (Optional)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSendOtp}
                    disabled={!email || isLoading}
                    className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Enter OTP sent to {email}</label>
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                    />
                  </div>

                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6 || isLoading}
                    className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      'Verify & Login'
                    )}
                  </Button>

                  <button
                    onClick={() => setShowOtp(false)}
                    className="w-full text-sm text-white/50 hover:text-cyan transition-colors"
                  >
                    Change email
                  </button>
                </>
              )}
            </TabsContent>

            <TabsContent value="phone" className="space-y-4 mt-4">
              {!showOtp ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Your Name (Optional)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSendOtp}
                    disabled={!phone || isLoading}
                    className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Enter OTP sent to {phone}</label>
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest bg-black/30 border-white/10 text-white placeholder:text-white/30 focus:border-cyan"
                    />
                  </div>

                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6 || isLoading}
                    className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      'Verify & Login'
                    )}
                  </Button>

                  <button
                    onClick={() => setShowOtp(false)}
                    className="w-full text-sm text-white/50 hover:text-cyan transition-colors"
                  >
                    Change phone number
                  </button>
                </>
              )}
            </TabsContent>

            <TabsContent value="guest" className="space-y-4 mt-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white/40" />
                </div>
                <p className="text-white/70 mb-2">Continue as Guest</p>
                <p className="text-sm text-white/50 mb-6">
                  Limited features available. Sign up for full access.
                </p>
                <Button
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="w-full bg-cyan text-black hover:bg-cyan-light font-semibold"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    'Continue as Guest'
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <p className="text-xs text-white/40 text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </DialogContent>
    </Dialog>
  );
}
