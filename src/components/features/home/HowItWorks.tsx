import { Heart, CreditCard, Gift, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Heart,
    title: "Choose Your Cause",
    description: "Browse through our various programs and select a cause that resonates with your values.",
    color: "primary",
  },
  {
    icon: CreditCard,
    title: "Select Amount",
    description: "Pick from preset amounts or enter a custom donation. Every contribution makes a difference.",
    color: "secondary",
  },
  {
    icon: Gift,
    title: "Make an Impact",
    description: "Complete your secure payment and receive confirmation. Watch your donation create real change.",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/50 section-divider">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Making a difference is easy. In just three simple steps, you can help 
            transform lives and communities.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-card text-foreground text-sm font-bold flex items-center justify-center shadow-soft z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`
                  w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
                  ${step.color === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary/10 text-secondary'}
                  shadow-soft transition-all duration-300 hover:scale-110 hover:shadow-soft-lg
                `}>
                  <step.icon className="w-9 h-9" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
