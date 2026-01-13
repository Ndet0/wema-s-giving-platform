import { Link } from "react-router-dom";
import { ArrowRight, Heart, Droplets, BookOpen, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const causes = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Providing access to clean, safe drinking water for communities in need across rural areas.",
    icon: Droplets,
    raised: 45000,
    goal: 75000,
    image: "water",
    color: "info",
  },
  {
    id: 2,
    title: "Education for All",
    description: "Supporting underprivileged children with school supplies, scholarships, and educational resources.",
    icon: BookOpen,
    raised: 28000,
    goal: 50000,
    image: "education",
    color: "secondary",
  },
  {
    id: 3,
    title: "Healthcare Access",
    description: "Bringing essential medical care and supplies to underserved communities worldwide.",
    icon: Stethoscope,
    raised: 62000,
    goal: 100000,
    image: "healthcare",
    color: "accent",
  },
  {
    id: 4,
    title: "Food Security Program",
    description: "Ensuring families have access to nutritious food through sustainable agricultural programs.",
    icon: Heart,
    raised: 38000,
    goal: 60000,
    image: "food",
    color: "primary",
  },
];

const FeaturedCauses = () => {
  return (
    <section className="py-20 section-divider">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Make a Difference
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Causes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a cause close to your heart. Every contribution helps us move closer 
            to creating meaningful, lasting change.
          </p>
        </div>

        {/* Causes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {causes.map((cause, index) => {
            const progress = Math.round((cause.raised / cause.goal) * 100);
            
            return (
              <div
                key={cause.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 card-hover animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <cause.icon className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      bg-card/90 backdrop-blur-sm shadow-soft
                    `}>
                      <cause.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cause.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {cause.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-foreground">
                        ${cause.raised.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        of ${cause.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-right mt-1">
                      <span className="text-xs text-primary font-medium">{progress}% funded</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/donate?cause=${cause.id}`}>
                      Donate Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Button asChild variant="ghost" size="lg">
            <Link to="/donate">
              View All Causes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCauses;
