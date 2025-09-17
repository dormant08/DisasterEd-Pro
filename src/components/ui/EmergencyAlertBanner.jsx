import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const EmergencyAlertBanner = ({ alert, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
    }
  }, [alert]);

  if (!alert || !isVisible) return null;

  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error text-error-foreground border-error';
      case 'high':
        return 'bg-warning text-warning-foreground border-warning';
      case 'medium':
        return 'bg-accent text-accent-foreground border-accent';
      default:
        return 'bg-primary text-primary-foreground border-primary';
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => onDismiss(), 300);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[1000] border-b-2 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${getAlertStyles(alert?.severity)}`}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Icon 
              name={getAlertIcon(alert?.severity)} 
              size={20} 
              className="flex-shrink-0 animate-pulse" 
            />
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-sm truncate">
                {alert?.title}
              </p>
              <p className="text-xs opacity-90 truncate">
                {alert?.location} • {alert?.time}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-current hover:bg-black/10 p-1"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-current hover:bg-black/10 p-1"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-current/20 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-heading font-medium text-sm mb-2">
                  Description
                </h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  {alert?.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-heading font-medium text-sm mb-2">
                  Immediate Actions
                </h4>
                <ul className="text-sm opacity-90 space-y-1">
                  {alert?.actions?.map((action, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-current hover:bg-white/30"
              >
                <Icon name="MapPin" size={14} className="mr-1" />
                View Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-current hover:bg-white/30"
              >
                <Icon name="Phone" size={14} className="mr-1" />
                Emergency Contacts
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-current hover:bg-white/30"
              >
                <Icon name="Share" size={14} className="mr-1" />
                Share Alert
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyAlertBanner;