import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickAccessTile = ({ 
  title, 
  description, 
  icon, 
  route, 
  status = 'available', 
  progress = null,
  variant = 'default'
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'border-success/30 bg-success/5 hover:bg-success/10';
      case 'in-progress':
        return 'border-warning/30 bg-warning/5 hover:bg-warning/10';
      case 'locked':
        return 'border-muted bg-muted/30 opacity-60 cursor-not-allowed';
      default:
        return 'border-border bg-card hover:bg-muted/50';
    }
  };

  const getIconStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'locked':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'locked':
        return 'Lock';
      default:
        return null;
    }
  };

  const TileContent = () => (
    <div className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-card ${getStatusStyles()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getIconStyles()}`}>
          <Icon name={icon} size={24} />
        </div>
        
        {getStatusIcon() && (
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon()} size={16} className={
              status === 'completed' ? 'text-success' :
              status === 'in-progress'? 'text-warning' : 'text-muted-foreground'
            } />
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
      
      {progress !== null && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                status === 'completed' ? 'bg-success' :
                status === 'in-progress'? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          status === 'locked' ? 'text-muted-foreground' : 'text-primary'
        }`}>
          {status === 'completed' ? 'Review' :
           status === 'in-progress' ? 'Continue' :
           status === 'locked' ? 'Locked' : 'Start'}
        </span>
        
        {status !== 'locked' && (
          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
        )}
      </div>
    </div>
  );

  if (status === 'locked') {
    return <TileContent />;
  }

  return (
    <Link to={route} className="block">
      <TileContent />
    </Link>
  );
};

export default QuickAccessTile;