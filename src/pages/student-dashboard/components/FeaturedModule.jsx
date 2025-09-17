import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedModule = ({ module }) => {
  if (!module) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No featured modules available</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-200">
      {/* Featured Badge */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-2">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={16} className="text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground">
            Featured for Your Region
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Module Image */}
          <div className="flex-shrink-0 mb-4 lg:mb-0">
            <div className="relative w-full lg:w-48 h-32 rounded-lg overflow-hidden">
              <Image
                src={module.thumbnail}
                alt={module.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(module.riskLevel)}`}>
                  {module.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>

          {/* Module Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {module.description}
                </p>
              </div>
            </div>

            {/* Module Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {module.duration} min
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {module.enrolledCount} students
                </span>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                {module.difficulty}
              </span>
            </div>

            {/* Progress Bar */}
            {module.progress > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium text-foreground">{module.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                className="flex-1"
                iconName={module.progress > 0 ? "Play" : "BookOpen"}
                iconPosition="left"
              >
                <Link to="/learning-modules" className="block w-full">
                  {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                </Link>
              </Button>
              
              <Button
                variant="outline"
                iconName="Info"
                iconPosition="left"
              >
                Module Details
              </Button>
            </div>

            {/* Regional Relevance */}
            <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="MapPin" size={16} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Relevant for {module.region}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Based on local disaster patterns and risk assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModule;