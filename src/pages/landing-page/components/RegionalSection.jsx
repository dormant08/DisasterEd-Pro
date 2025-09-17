import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegionalSection = () => {
  const regionalFeatures = [
    {
      id: 1,
      title: "Earthquake Preparedness",
      description: "Specialized content for seismic zones across India with region-specific protocols",
      regions: ["Delhi NCR", "Gujarat", "Himachal Pradesh", "Uttarakhand"],
      icon: "Mountain",
      color: "warning"
    },
    {
      id: 2,
      title: "Flood Management",
      description: "Monsoon and flood preparedness for flood-prone areas with evacuation strategies",
      regions: ["Kerala", "Assam", "Bihar", "West Bengal"],
      icon: "Waves",
      color: "primary"
    },
    {
      id: 3,
      title: "Cyclone Safety",
      description: "Coastal disaster preparedness with early warning systems and shelter protocols",
      regions: ["Odisha", "Andhra Pradesh", "Tamil Nadu", "Gujarat Coast"],
      icon: "Wind",
      color: "secondary"
    },
    {
      id: 4,
      title: "Fire Safety",
      description: "Urban fire safety protocols for schools in metropolitan areas",
      regions: ["Mumbai", "Bangalore", "Chennai", "Hyderabad"],
      icon: "Flame",
      color: "error"
    }
  ];

  const trustSignals = [
    {
      id: 1,
      name: "CBSE Approved",
      description: "Curriculum aligned with CBSE guidelines",
      icon: "Award",
      badge: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "NDMA Certified",
      description: "National Disaster Management Authority recognition",
      icon: "Shield",
      badge: "https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "ISO 27001",
      description: "Information security management certified",
      icon: "Lock",
      badge: "https://images.pixabay.com/photo/2018/03/22/02/37/email-3249062_1280.png?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "Data Privacy",
      description: "GDPR and Indian data protection compliant",
      icon: "UserCheck",
      badge: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Principal, Delhi Public School",
      location: "New Delhi",
      content: "DisasterEd Pro has transformed our emergency preparedness. Students are more confident and our drill efficiency has improved by 40%.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Safety Coordinator, Kendriya Vidyalaya",
      location: "Mumbai",
      content: "The regional customization for Mumbai\'s fire safety protocols is excellent. Our teachers find the platform very user-friendly.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=60&h=60&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Meera Nair",
      role: "Vice Principal, St. Mary's School",
      location: "Kerala",
      content: "The flood preparedness modules are incredibly relevant for our region. Students love the gamified learning approach.",
      avatar: "https://images.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg?w=60&h=60&fit=crop",
      rating: 5
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'secondary':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="MapPin" size={16} />
            <span>India-Specific Content</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Regional Disaster
            <span className="text-secondary block">Preparedness</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Customized content for India's diverse geographical regions and disaster patterns, ensuring relevant and effective preparedness education.
          </p>
        </div>

        {/* Regional Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {regionalFeatures?.map((feature) => (
            <div
              key={feature?.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClasses(feature?.color)}`}>
                  <Icon name={feature?.icon} size={24} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {feature?.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature?.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {feature?.regions?.map((region, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              Trusted & Certified
            </h3>
            <p className="text-muted-foreground">
              Recognized by leading educational and safety authorities in India
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals?.map((signal) => (
              <div
                key={signal?.id}
                className="text-center space-y-3 p-4 bg-card rounded-lg border border-border"
              >
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-muted">
                  <Image
                    src={signal?.badge}
                    alt={signal?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="font-heading font-semibold text-foreground">
                    {signal?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {signal?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              What Indian Schools Say
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from educators across India who have transformed their disaster preparedness programs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div
                key={testimonial?.id}
                className="bg-card border border-border rounded-xl p-6 space-y-4"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial?.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {testimonial?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial?.role}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {testimonial?.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalSection;