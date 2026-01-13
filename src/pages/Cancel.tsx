import { Link } from "react-router-dom";
import { XCircle, ArrowLeft, Heart, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Cancel = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Cancel Icon */}
            <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-8 animate-scale-in">
              <XCircle className="w-12 h-12 text-muted-foreground" />
            </div>

            {/* Message */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
              Payment Cancelled
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 animate-fade-up delay-100">
              No worries! Your payment was cancelled and you haven't been charged. 
              If you experienced any issues, we're here to help.
            </p>

            {/* Help Section */}
            <div className="bg-card rounded-2xl p-6 shadow-soft mb-8 text-left animate-fade-up delay-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6 text-info" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you encountered any issues during the payment process, our team 
                    is happy to help. You can:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Try a different payment method</li>
                    <li>• Contact us at <a href="mailto:support@wemacharity.org" className="text-primary hover:underline">support@wemacharity.org</a></li>
                    <li>• Call us at +1 (234) 567-8900</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
              <Button asChild variant="default" size="lg">
                <Link to="/donate">
                  <Heart className="w-4 h-4" />
                  Try Again
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Return Home
                </Link>
              </Button>
            </div>

            {/* Alternative Payment Methods */}
            <div className="mt-12 animate-fade-up delay-400">
              <p className="text-sm text-muted-foreground mb-4">
                Alternative ways to donate:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
                  PayPal
                </div>
                <div className="px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
                  Bank Transfer
                </div>
                <div className="px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
                  Check by Mail
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cancel;
