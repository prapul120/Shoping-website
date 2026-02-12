import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/AppContext';

export function CTASection() {
  const { setCurrentView, setIsLoginModalOpen } = useAppStore();

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Pulsing Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/10 rounded-full blur-[150px] animate-pulse" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan">Start Your Journey</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 animate-fade-in-up stagger-1">
            READY TO FIND YOUR{' '}
            <span className="text-gradient">PERFECT PRODUCT?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Join thousands of smart shoppers making informed decisions every day. 
            Search, compare, and discover with ease.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up stagger-3">
            {[
              { icon: Zap, text: 'Instant Search' },
              { icon: Shield, text: 'Trusted Reviews' },
              { icon: Sparkles, text: 'Smart Compare' },
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 text-white/60">
                <feature.icon className="w-5 h-5 text-cyan" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
            <Button
              size="lg"
              onClick={() => setCurrentView('search')}
              className="bg-cyan text-black hover:bg-cyan-light font-semibold px-8 py-6 rounded-xl text-base group animate-pulse-glow"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsLoginModalOpen(true)}
              className="border-white/20 text-white hover:bg-white/5 px-8 py-6 rounded-xl text-base"
            >
              Create Account
            </Button>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-white/40 mt-6 animate-fade-in-up stagger-5">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
