import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertHistoryCard = ({ alert, onViewDetails }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-accent';
      default:
        return 'text-primary';
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

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-muted ${getSeverityColor(alert?.severity)}`}>
            <Icon name={getAlertIcon(alert?.type)} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-medium text-foreground">
              {alert?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {alert?.location}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {formatDate(alert?.timestamp)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatTime(alert?.timestamp)}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {alert?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Duration: {alert?.duration || 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {alert?.affectedCount || 0} affected
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(alert)}
        >
          <Icon name="Eye" size={14} className="mr-1" />
          View
        </Button>
      </div>
      {alert?.resolved && (
        <div className="flex items-center space-x-1 mt-2 pt-2 border-t border-border">
          <Icon name="CheckCircle" size={14} className="text-success" />
          <span className="text-xs text-success font-medium">Resolved</span>
        </div>
      )}
    </div>
  );
};

export default AlertHistoryCard;