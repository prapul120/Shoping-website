import { Search, GitCompare, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Search or Scan',
    description: 'Type the product name or use our barcode scanner to find any product instantly.',
    icon: Search,
    color: 'from-cyan/20 to-cyan/5',
  },
  {
    number: '02',
    title: 'Compare Products',
    description: 'View detailed comparisons, ratings, and reviews side by side.',
    icon: GitCompare,
    color: 'from-purple-500/20 to-purple-500/5',
  },
  {
    number: '03',
    title: 'Make Decision',
    description: 'Choose confidently with all the information you need at your fingertips.',
    icon: CheckCircle,
    color: 'from-green-500/20 to-green-500/5',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 animate-fade-in-up">
            HOW IT <span className="text-gradient">WORKS</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto animate-fade-in-up stagger-1">
            Three simple steps to discover your perfect product
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${(index + 2) * 0.15}s` }}
              >
                {/* Card */}
                <div className="relative bg-dark-secondary rounded-3xl p-8 border border-white/5 hover:border-cyan/30 transition-all duration-500 h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Number */}
                    <div className="text-6xl font-black text-white/5 group-hover:text-cyan/20 transition-colors duration-500 mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center mb-6 group-hover:bg-cyan/20 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-7 h-7 text-cyan" />
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Line (not on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: '10K+', label: 'Products' },
            { value: '50K+', label: 'Users' },
            { value: '100K+', label: 'Reviews' },
            { value: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${(index + 5) * 0.1}s` }}
            >
              <div className="text-3xl sm:text-4xl font-black text-cyan mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
