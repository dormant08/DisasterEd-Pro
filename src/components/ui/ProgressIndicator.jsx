import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  progress = 0, 
  total = 100, 
  label = "Progress", 
  showPercentage = true,
  showStats = true,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'h-2',
          text: 'text-xs',
          icon: 12
        };
      case 'lg':
        return {
          container: 'h-4',
          text: 'text-base',
          icon: 20
        };
      default:
        return {
          container: 'h-3',
          text: 'text-sm',
          icon: 16
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const getProgressIcon = () => {
    if (percentage === 100) return 'CheckCircle';
    if (percentage >= 75) return 'TrendingUp';
    if (percentage >= 50) return 'Activity';
    if (percentage >= 25) return 'Play';
    return 'Circle';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getProgressIcon()} 
            size={sizeStyles?.icon} 
            className={variantStyles}
          />
          <span className={`font-heading font-medium ${sizeStyles?.text} text-foreground`}>
            {label}
          </span>
        </div>
        
        {showPercentage && (
          <span className={`font-mono font-medium ${sizeStyles?.text} ${variantStyles}`}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full bg-muted rounded-full ${sizeStyles?.container} overflow-hidden`}>
          <div
            className={`${sizeStyles?.container} rounded-full transition-all duration-300 ease-out ${
              percentage === 100 ? 'bg-success' : variantStyles?.replace('text-', 'bg-')
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Animated shine effect for active progress */}
        {percentage > 0 && percentage < 100 && (
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      {/* Stats */}
      {showStats && (
        <div className="flex items-center justify-between mt-2">
          <span className={`${sizeStyles?.text} text-muted-foreground`}>
            {progress} of {total} completed
          </span>
          
          {percentage === 100 && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="Trophy" size={sizeStyles?.icon} />
              <span className={`${sizeStyles?.text} font-medium`}>
                Complete!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Circular Progress Variant
export const CircularProgress = ({ 
  progress = 0, 
  total = 100, 
  size = 60, 
  strokeWidth = 4,
  showPercentage = true,
  variant = "default",
  className = ""
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return 'stroke-success';
      case 'warning':
        return 'stroke-warning';
      case 'error':
        return 'stroke-error';
      default:
        return 'stroke-primary';
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-300 ease-out ${getVariantColor()}`}
        />
      </svg>
      
      {/* Center content */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-semibold text-sm text-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;