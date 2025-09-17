import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertMap = ({ alerts, userLocation, onLocationUpdate }) => {
  const [mapView, setMapView] = useState('satellite');
  const [showSafeZones, setShowSafeZones] = useState(true);

  // Mock coordinates for demonstration
  const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // New Delhi
  const currentLocation = userLocation || defaultLocation;

  const mapUrl = `https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=12&output=embed`;

  const activeAlerts = alerts?.filter(alert => alert?.status === 'active');

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-foreground">
            Emergency Alert Map
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              Satellite
            </Button>
            <Button
              variant={mapView === 'terrain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('terrain')}
            >
              Terrain
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Your Location</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Active Alerts</span>
            </div>
            {showSafeZones && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Safe Zones</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSafeZones(!showSafeZones)}
          >
            <Icon name={showSafeZones ? 'EyeOff' : 'Eye'} size={14} className="mr-1" />
            Safe Zones
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Alert Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          className="border-0"
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onLocationUpdate}
            className="bg-card shadow-md"
          >
            <Icon name="Navigation" size={14} className="mr-1" />
            My Location
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-card shadow-md"
          >
            <Icon name="ZoomIn" size={14} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="bg-card shadow-md"
          >
            <Icon name="ZoomOut" size={14} />
          </Button>
        </div>

        {/* Alert Summary Overlay */}
        {activeAlerts?.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-medium text-foreground">
                    {activeAlerts?.length} Active Alert{activeAlerts?.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Nearest: {activeAlerts?.[0]?.location} ({activeAlerts?.[0]?.distance || '2.5 km'})
                  </p>
                </div>
                <Button variant="default" size="sm">
                  <Icon name="AlertTriangle" size={14} className="mr-1" />
                  View All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Location Info */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm text-foreground">
              Current Location: New Delhi, India
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date()?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMap;