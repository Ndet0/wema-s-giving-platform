import { Link } from "react-router-dom";
import { Heart, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const CallToAction = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about our work and impact.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              <Heart className="w-4 h-4 fill-primary-foreground" />
              Join Our Mission
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Your generosity can provide food, clean water, education, and healthcare 
              to those who need it most. Start your giving journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:shadow-lg">
                <Link to="/donate">
                  <Heart className="w-5 h-5" />
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/about">
                  Learn About Our Work
                </Link>
              </Button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 md:p-10">
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-3">
              Stay Connected
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              Subscribe to receive updates on our programs and impact stories.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-primary-foreground border-0 text-foreground placeholder:text-muted-foreground h-12"
                  required
                />
              </div>
              <Button type="submit" variant="secondary" size="lg">
                Subscribe
              </Button>
            </form>
            
            <p className="text-primary-foreground/50 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
