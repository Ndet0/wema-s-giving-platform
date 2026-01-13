import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Target, Eye, Users, Award, Globe, Calendar } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every challenge with empathy and genuine care for those we serve.",
  },
  {
    icon: Target,
    title: "Integrity",
    description: "Transparency and honesty guide all our actions and decisions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of partnerships and community-driven solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
  },
];

const timeline = [
  { year: "2010", title: "Founded", description: "WEMA was established with a mission to serve underserved communities." },
  { year: "2013", title: "First Major Project", description: "Launched our clean water initiative, serving 5,000 families." },
  { year: "2016", title: "Global Expansion", description: "Extended our reach to 10 countries across three continents." },
  { year: "2019", title: "Education Program", description: "Started our education for all initiative, supporting 10,000 students." },
  { year: "2022", title: "Milestone Achievement", description: "Celebrated helping 50,000 families worldwide." },
  { year: "2024", title: "Continuing the Mission", description: "Expanding our healthcare and food security programs." },
];

const team = [
  { name: "Dr. Sarah Johnson", role: "Executive Director", initials: "SJ" },
  { name: "Michael Chen", role: "Program Director", initials: "MC" },
  { name: "Emily Rodriguez", role: "Operations Manager", initials: "ER" },
  { name: "David Thompson", role: "Community Outreach", initials: "DT" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 hero-pattern">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-down">
                Our Story
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
                Building a Better World, Together
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-up delay-100">
                For over a decade, WEMA Charity Foundation has been committed to transforming 
                lives through sustainable programs that address the root causes of poverty.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl p-8 shadow-soft animate-fade-up">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To empower underserved communities by providing essential resources, education, 
                  and sustainable solutions that enable individuals and families to break the 
                  cycle of poverty and build prosperous futures.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-soft animate-fade-up delay-100">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every person has access to clean water, nutritious food, 
                  quality education, and adequate healthcare—where communities thrive and 
                  individuals can reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/50 section-divider">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do and shape how we serve communities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 text-center shadow-soft card-hover animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
       

        {/* Impact Numbers */}
        <section className="py-20 bg-foreground section-divider">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-background mb-4">
                Our Global Reach
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "2+", label: "Countries", icon: Globe },
                { value: "10K+", label: "Families Served", icon: Users },
                { value: "10+", label: "Active Projects", icon: Target },
                { value: "500+", label: "Volunteers", icon: Heart },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-background mb-1">{stat.value}</div>
                  <div className="text-background/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
