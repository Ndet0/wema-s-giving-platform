import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const presetAmounts = [10, 25, 50, 100, 250, 500];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!finalAmount || finalAmount < 1) {
      toast({
        title: "Please select an amount",
        description: "Enter a valid donation amount to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!donorInfo.email) {
      toast({
        title: "Email required",
        description: "Please enter your email to receive your donation receipt.",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with Stripe or PayPal
    toast({
      title: "Processing donation...",
      description: `Thank you for your $${finalAmount} donation!`,
    });
    
    // Redirect to success page (simulated)
    setTimeout(() => {
      window.location.href = "/success";
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
                <Sparkles className="w-4 h-4" />
                Make a Difference Today
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
                Your Donation Changes Lives
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto animate-fade-up delay-100">
                Every contribution, no matter the size, helps us provide essential resources 
                to communities in need around the world.
              </p>
            </div>

            {/* Donation Form */}
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
              {/* Left Column - Amount Selection */}
              <div className="lg:col-span-3 space-y-8">
                {/* Amount Selection */}
                <div className="bg-card rounded-2xl p-6 shadow-soft animate-fade-up delay-200">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Select Amount
                  </h2>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={cn(
                          "py-4 px-4 rounded-xl font-semibold text-lg transition-all duration-200 border-2",
                          selectedAmount === amount
                            ? "bg-primary text-primary-foreground border-primary shadow-glow"
                            : "bg-muted border-transparent hover:border-primary/30 text-foreground"
                        )}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="pl-8 h-14 text-lg"
                      min="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="bg-card rounded-2xl p-6 shadow-soft animate-fade-up delay-300">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Your Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={donorInfo.name}
                        onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-8900"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="message">Dedication Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="In honor of..."
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                        className="mt-1.5 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-2xl p-6 shadow-soft animate-fade-up delay-400">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Method
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">Credit / Debit Card</div>
                          <div className="text-sm text-muted-foreground">Secure payment via Stripe</div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                        paymentMethod === "paypal"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-info">
                          PP
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">PayPal</div>
                          <div className="text-sm text-muted-foreground">Quick & easy checkout</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-28 animate-fade-up delay-300">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                    Donation Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-4 border-b border-border">
                      <span className="text-muted-foreground">Donation Amount</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${finalAmount || 0}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span>100% of your donation goes directly to our programs</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span>Tax-deductible receipt will be sent to your email</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span>You can cancel recurring donations anytime</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="xl" 
                    className="w-full mb-4"
                    disabled={!finalAmount}
                  >
                    <Heart className="w-5 h-5" />
                    Complete Donation
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Secure 256-bit SSL encryption
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-muted flex items-center justify-center mb-1">
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">SSL Secure</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-muted flex items-center justify-center mb-1">
                          <CheckCircle className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">Verified</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 mx-auto rounded-lg bg-muted flex items-center justify-center mb-1">
                          <Heart className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">501(c)(3)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
