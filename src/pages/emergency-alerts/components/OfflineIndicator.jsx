import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OfflineIndicator = ({ onViewOfflineProtocols }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastSync(new Date());
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000 / 60); // minutes
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`;
    return lastSync?.toLocaleDateString('en-IN');
  };

  const offlineProtocols = [
    {
      id: 1,
      title: 'Earthquake Response',
      steps: 8,
      icon: 'Zap'
    },
    {
      id: 2,
      title: 'Fire Evacuation',
      steps: 12,
      icon: 'Flame'
    },
    {
      id: 3,
      title: 'Flood Safety',
      steps: 10,
      icon: 'CloudRain'
    },
    {
      id: 4,
      title: 'Emergency Contacts',
      steps: 15,
      icon: 'Phone'
    }
  ];

  return (
    <div className={`bg-card rounded-lg border transition-all duration-200 ${
      isOnline ? 'border-border' : 'border-warning/50 bg-warning/5'
    }`}>
      {/* Connection Status Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              isOnline ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
            }`}>
              <Icon 
                name={isOnline ? 'Wifi' : 'WifiOff'} 
                size={20} 
                className={isOnline ? 'text-success' : 'text-warning'}
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                {isOnline ? 'Connected' : 'Offline Mode'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isOnline 
                  ? `Last synced: ${formatLastSync()}`
                  : 'Emergency protocols available offline'
                }
              </p>
            </div>
          </div>

          {isOnline && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Live</span>
            </div>
          )}
        </div>
      </div>
      {/* Offline Content */}
      {!isOnline && (
        <div className="p-4">
          <div className="bg-warning/10 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-heading font-medium text-foreground mb-1">
                  Limited Connectivity
                </h4>
                <p className="text-sm text-muted-foreground">
                  You're currently offline. Emergency protocols and basic safety information remain accessible.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-medium text-foreground">
              Available Offline Protocols
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {offlineProtocols?.map((protocol) => (
                <div
                  key={protocol?.id}
                  className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer"
                  onClick={() => onViewOfflineProtocols(protocol)}
                >
                  <Icon name={protocol?.icon} size={16} className="text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">
                      {protocol?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {protocol?.steps} steps available
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewOfflineProtocols()}
              className="w-full"
            >
              <Icon name="Download" size={14} className="mr-2" />
              View All Offline Protocols
            </Button>
          </div>
        </div>
      )}
      {/* Online Status */}
      {isOnline && (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">
                Real-time alerts active
              </span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Sync Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineIndicator;