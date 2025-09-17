import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ProgressCard = ({ title, current, total, icon, variant = "default", description }) => {
  const percentage = Math.round((current / total) * 100);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'primary':
        return 'border-primary/20 bg-primary/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${getVariantStyles()} hover:shadow-card transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-md ${
            variant === 'success' ? 'bg-success text-success-foreground' :
            variant === 'warning' ? 'bg-warning text-warning-foreground' :
            variant === 'primary' ? 'bg-primary text-primary-foreground' :
            'bg-muted text-muted-foreground'
          }`}>
            <Icon name={icon} size={20} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{current}</div>
          <div className="text-sm text-muted-foreground">of {total}</div>
        </div>
      </div>
      
      <ProgressIndicator
        progress={current}
        total={total}
        variant={variant}
        showStats={false}
        className="mb-2"
      />
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className={`font-medium ${
          variant === 'success' ? 'text-success' :
          variant === 'warning' ? 'text-warning' :
          variant === 'primary'? 'text-primary' : 'text-foreground'
        }`}>
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressCard;