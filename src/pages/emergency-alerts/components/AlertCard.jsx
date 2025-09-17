import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onViewDetails, onDismiss }) => {
  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-error/10 border-error/30 border-l-4 border-l-error',
          icon: 'text-error',
          badge: 'bg-error text-error-foreground'
        };
      case 'high':
        return {
          container: 'bg-warning/10 border-warning/30 border-l-4 border-l-warning',
          icon: 'text-warning',
          badge: 'bg-warning text-warning-foreground'
        };
      case 'medium':
        return {
          container: 'bg-accent/10 border-accent/30 border-l-4 border-l-accent',
          icon: 'text-accent',
          badge: 'bg-accent text-accent-foreground'
        };
      default:
        return {
          container: 'bg-primary/10 border-primary/30 border-l-4 border-l-primary',
          icon: 'text-primary',
          badge: 'bg-primary text-primary-foreground'
        };
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return 'Zap';
      case 'flood':
        return 'CloudRain';
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

  const styles = getSeverityStyles(alert?.severity);
  const timeAgo = new Date(alert.timestamp)?.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`bg-card rounded-lg border p-4 ${styles?.container} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-background ${styles?.icon}`}>
            <Icon name={getAlertIcon(alert?.type)} size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-semibold text-foreground">
                {alert?.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles?.badge}`}>
                {alert?.severity?.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {alert?.location} • {timeAgo}
            </p>
          </div>
        </div>

        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(alert?.id)}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>
      <p className="text-sm text-foreground mb-4 leading-relaxed">
        {alert?.description}
      </p>
      {alert?.actions && alert?.actions?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-heading font-medium text-sm text-foreground mb-2">
            Immediate Actions:
          </h4>
          <ul className="space-y-1">
            {alert?.actions?.slice(0, 3)?.map((action, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(alert)}
          className="flex-1 sm:flex-none"
        >
          <Icon name="Eye" size={14} className="mr-1" />
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <Icon name="MapPin" size={14} className="mr-1" />
          View Map
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 sm:flex-none"
        >
          <Icon name="Share" size={14} className="mr-1" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default AlertCard;