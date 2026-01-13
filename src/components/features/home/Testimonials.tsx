import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote: "Donating to WEMA has been one of the most rewarding experiences. Seeing the direct impact on communities gives me hope for a better world.",
    name: "Sarah Mitchell",
    title: "Monthly Donor",
    avatar: "SM",
  },
  {
    id: 2,
    quote: "The transparency and dedication of the WEMA team is remarkable. I know my contributions are making real change in people's lives.",
    name: "Michael Chen",
    title: "Corporate Partner",
    avatar: "MC",
  },
  {
    id: 3,
    quote: "I've been supporting WEMA for 5 years now. The updates and stories they share show the tangible difference each donation makes.",
    name: "Emily Rodriguez",
    title: "Legacy Donor",
    avatar: "ER",
  },
  {
    id: 4,
    quote: "What sets WEMA apart is their commitment to sustainable solutions. They're not just providing aid—they're building futures.",
    name: "David Thompson",
    title: "Volunteer Coordinator",
    avatar: "DT",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 section-divider">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Words from Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from donors and partners who are part of our mission to create lasting change.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl shadow-soft-lg p-8 md:p-12 overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium italic">
                "{testimonials[currentIndex].quote}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-3">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].title}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
