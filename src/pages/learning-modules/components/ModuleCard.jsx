import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ModuleCard = ({ module, onStartModule, onContinueModule }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getDisasterIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return 'Zap';
      case 'flood':
        return 'Waves';
      case 'fire':
        return 'Flame';
      case 'cyclone':
        return 'Wind';
      case 'landslide':
        return 'Mountain';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Module Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={module.thumbnail}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
            <Icon name={getDisasterIcon(module.type)} size={12} />
            <span className="capitalize">{module.difficulty}</span>
          </div>
        </div>
        {module.isNew && (
          <div className="absolute top-3 right-3">
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
              New
            </div>
          </div>
        )}
      </div>

      {/* Module Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
            {module.title}
          </h3>
          <div className="flex items-center space-x-1 text-muted-foreground ml-2">
            <Icon name="Clock" size={14} />
            <span className="text-sm">{module.duration}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {module.description}
        </p>

        {/* Module Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={14} />
              <span>{module.lessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{module.enrolled}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium">{module.rating}</span>
          </div>
        </div>

        {/* Progress */}
        {module.progress > 0 && (
          <div className="mb-4">
            <ProgressIndicator
              progress={module.progress}
              total={100}
              label="Progress"
              showPercentage={true}
              showStats={false}
              size="sm"
            />
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          {module.progress === 0 ? (
            <Button
              variant="default"
              onClick={() => onStartModule(module)}
              className="flex-1"
              iconName="Play"
              iconPosition="left"
            >
              Start Module
            </Button>
          ) : module.progress === 100 ? (
            <Button
              variant="outline"
              onClick={() => onContinueModule(module)}
              className="flex-1"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Review Module
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={() => onContinueModule(module)}
              className="flex-1"
              iconName="PlayCircle"
              iconPosition="left"
            >
              Continue
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
          >
            <Icon name="Bookmark" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;