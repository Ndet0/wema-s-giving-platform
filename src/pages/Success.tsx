import { Link } from "react-router-dom";
import { CheckCircle, Heart, ArrowRight, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";

const Success = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon with Animation */}
            <div className="relative inline-block mb-8">
              {/* Confetti Effect */}
              {showConfetti && (
                <div className="absolute inset-0 -inset-x-20 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-fade-up"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: ['hsl(162 63% 41%)', 'hsl(38 92% 50%)', 'hsl(350 80% 60%)'][i % 3],
                        animationDelay: `${Math.random() * 500}ms`,
                        animationDuration: `${1000 + Math.random() * 1000}ms`,
                      }}
                    />
                  ))}
                </div>
              )}
              
              <div className="w-28 h-28 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
              Thank You for Your Generosity!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up delay-100">
              Your donation has been processed successfully. You're making a real 
              difference in the lives of those who need it most.
            </p>

            {/* Donation Details */}
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8 animate-fade-up delay-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-primary fill-primary" />
                <span className="text-3xl font-bold text-foreground">$50.00</span>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Transaction ID: <span className="font-mono">TXN-2024-XXXXX</span></p>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-muted/50 rounded-2xl p-6 mb-8 text-left animate-fade-up delay-300">
              <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>A confirmation email with your receipt has been sent to your email address.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>Your tax-deductible receipt will be available for download shortly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>We'll send you updates on the impact of your donation.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-up delay-400">
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4" />
                Share Your Impact
              </Button>
            </div>

            {/* Continue Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-500">
              <Button asChild variant="default" size="lg">
                <Link to="/donate">
                  <Heart className="w-4 h-4" />
                  Make Another Donation
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/">
                  Return to Home
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
