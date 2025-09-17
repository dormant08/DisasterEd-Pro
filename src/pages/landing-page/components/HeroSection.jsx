import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Shield" size={16} />
                <span>Trusted by 500+ Schools Across India</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                Master Disaster
                <span className="text-primary block">Preparedness</span>
                <span className="text-secondary">Education</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Comprehensive disaster preparedness platform for Indian schools. Interactive learning, virtual drills, and gamified experiences to build emergency response skills.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/student-dashboard">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="ArrowRight" 
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Get Started Free
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Play"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="text-primary" />
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Award" size={16} className="text-secondary" />
                <span>CBSE Approved</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} className="text-accent" />
                <span>Pan-India Coverage</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-2xl p-8 border border-border">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                alt="Students participating in disaster preparedness drill"
                className="w-full h-80 object-cover rounded-xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-success text-success-foreground p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} />
                  <div>
                    <div className="font-semibold text-sm">95% Success Rate</div>
                    <div className="text-xs opacity-90">Emergency Drills</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-warning text-warning-foreground p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={20} />
                  <div>
                    <div className="font-semibold text-sm">Real-time Alerts</div>
                    <div className="text-xs opacity-90">Location Based</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;