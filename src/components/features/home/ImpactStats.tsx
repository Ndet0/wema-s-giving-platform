import { useEffect, useRef, useState } from "react";
import { Users, Home, Heart, Globe } from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: 200000,
    suffix: "+",
    prefix: "$",
    label: "Total Donations Raised",
    color: "primary",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Families Helped",
    color: "secondary",
  },
  {
    icon: Home,
    value: 10,
    suffix: "+",
    label: "Active Projects",
    color: "primary",
  },
  {
    icon: Globe,
    value: 2,
    suffix: "",
    label: "Countries Reached",
    color: "secondary",
  },
];

const AnimatedCounter = ({ 
  value, 
  prefix = "", 
  suffix = "", 
  isVisible 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <span>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const ImpactStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-background mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto">
            Every donation, no matter the size, creates ripples of change. 
            Here's how your generosity has transformed lives.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                relative bg-background/5 backdrop-blur-sm rounded-2xl p-6 text-center
                border border-background/10 hover:border-background/20 transition-all duration-300
                hover:-translate-y-1 group
                ${isVisible ? 'animate-scale-in' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`
                w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center
                ${stat.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'}
                group-hover:scale-110 transition-transform duration-300
              `}>
                <stat.icon className={`
                  w-7 h-7
                  ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}
                `} />
              </div>
              
              <div className="text-3xl md:text-4xl font-bold text-background mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              
              <div className="text-background/60 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
