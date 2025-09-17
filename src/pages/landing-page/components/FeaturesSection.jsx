import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "BookOpen",
      title: "Interactive Learning Modules",
      description: "Comprehensive disaster education with multimedia content, infographics, and region-specific scenarios tailored for Indian schools.",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?w=400&h=300&fit=crop",
      color: "primary"
    },
    {
      id: 2,
      icon: "Play",
      title: "Virtual Drill Simulations",
      description: "Realistic earthquake, fire, and flood evacuation drills with performance analytics and feedback for continuous improvement.",
      image: "https://images.pixabay.com/photo/2019/07/17/20/47/students-4345103_1280.jpg?w=400&h=300&fit=crop",
      color: "secondary"
    },
    {
      id: 3,
      icon: "Trophy",
      title: "Gamified Learning System",
      description: "Earn badges, points, and climb leaderboards while mastering emergency response skills through engaging challenges.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&h=300&fit=crop",
      color: "accent"
    },
    {
      id: 4,
      icon: "AlertTriangle",
      title: "Real-time Disaster Alerts",
      description: "Location-based emergency notifications with immediate action protocols and emergency contact integration.",
      image: "https://images.pexels.com/photos/73833/hurricane-earth-satellite-tracking-73833.jpeg?w=400&h=300&fit=crop",
      color: "warning"
    },
    {
      id: 5,
      icon: "BarChart3",
      title: "Progress Analytics",
      description: "Comprehensive tracking of student progress, institutional preparedness scores, and detailed performance reports.",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=300&fit=crop",
      color: "success"
    },
    {
      id: 6,
      icon: "Globe",
      title: "Multi-language Support",
      description: "Available in English, Hindi, and regional Indian languages to ensure accessibility across diverse communities.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'secondary':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'accent':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Sparkles" size={16} />
            <span>Comprehensive Platform Features</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Everything You Need for
            <span className="text-primary block">Disaster Preparedness</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our platform combines cutting-edge technology with proven educational methods to deliver comprehensive disaster preparedness training for Indian educational institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Feature Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src={feature?.image}
                  alt={feature?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Feature Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg border mb-4 ${getColorClasses(feature?.color)}`}>
                <Icon name={feature?.icon} size={24} />
              </div>

              {/* Feature Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {feature?.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>

              {/* Learn More Link */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary/80 transition-colors duration-200">
                  <span>Learn more</span>
                  <Icon name="ArrowRight" size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-card border border-border rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full border-2 border-card"></div>
              <div className="w-8 h-8 bg-secondary rounded-full border-2 border-card"></div>
              <div className="w-8 h-8 bg-accent rounded-full border-2 border-card"></div>
            </div>
            <span className="text-sm text-muted-foreground">
              Join thousands of schools already using DisasterEd Pro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;