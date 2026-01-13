import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-soft delay-300" />

      <div className="container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-down">
              <Heart className="w-4 h-4 fill-primary" />
              Making a difference since 2010
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              Changing Lives,{" "}
              <span className="text-gradient">One Doorstep</span>{" "}
              at a Time
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up delay-100">
              Join us in our mission to provide essential support to communities in need. 
              Together, we can create lasting change and build a brighter future for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up delay-200">
              <Button asChild variant="hero" size="xl">
                <Link to="/donate">
                  <Heart className="w-5 h-5" />
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 animate-fade-up delay-300">
              {[
                { icon: Users, value: "50K+", label: "Lives Impacted" },
                { icon: Globe, value: "25+", label: "Countries" },
                { icon: Heart, value: "$2M+", label: "Raised" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:block animate-fade-up delay-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-soft-lg h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Users className="w-16 h-16 text-primary/40" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-soft-lg h-64 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <Heart className="w-20 h-20 text-secondary/40" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-soft-lg h-64 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                  <Globe className="w-20 h-20 text-primary/40" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-soft-lg h-48 bg-gradient-to-br from-secondary/20 to-primary/5 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-secondary/40 fill-secondary/20" />
                </div>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-8 bg-card rounded-2xl shadow-soft-lg p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-success fill-success" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">$125,000</div>
                  <div className="text-xs text-muted-foreground">Raised this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
