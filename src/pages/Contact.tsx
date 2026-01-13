import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "info@wemacharity.org",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (234) 567-8900",
    description: "Mon-Fri, 9am-5pm EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Charity Lane, Suite 100",
    description: "New York, NY 10001",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Monday - Friday",
    description: "9:00 AM - 5:00 PM EST",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-up">
              We'd Love to Hear From You
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto animate-fade-up delay-100">
              Have questions about our programs, want to partner with us, or interested 
              in volunteering? Reach out and we'll get back to you promptly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-5 shadow-soft animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-foreground font-medium text-sm">
                        {info.details}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-soft h-48 animate-fade-up delay-400">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/30" />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft animate-fade-up delay-200">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6 animate-scale-in">
                      <CheckCircle className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      Thank You!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Your message has been sent successfully. We'll get back to you 
                      within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1.5"
                            required
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
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1.5"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-8900"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <select
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Partnership</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="donation">Donation Question</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                          className="mt-1.5 resize-none"
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
