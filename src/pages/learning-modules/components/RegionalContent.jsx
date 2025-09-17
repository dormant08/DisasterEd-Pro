import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const RegionalContent = ({ userLocation, regionalRisks, localProtocols }) => {
  const [selectedRisk, setSelectedRisk] = useState(regionalRisks?.[0]);

  const getRiskSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getRiskIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return 'Zap';
      case 'flood':
        return 'Waves';
      case 'cyclone':
        return 'Wind';
      case 'landslide':
        return 'Mountain';
      case 'tsunami':
        return 'Waves';
      case 'fire':
        return 'Flame';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
            Regional Risk Assessment
          </h3>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{userLocation}</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="RefreshCw">
          Update Location
        </Button>
      </div>
      {/* Risk Overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {regionalRisks?.map((risk, index) => (
          <button
            key={index}
            onClick={() => setSelectedRisk(risk)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedRisk?.type === risk?.type
                ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={getRiskIcon(risk?.type)} size={20} className="text-primary" />
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskSeverityColor(risk?.severity)}`}>
                {risk?.severity?.toUpperCase()}
              </div>
            </div>
            
            <h4 className="font-medium text-foreground mb-1 capitalize">
              {risk?.type}
            </h4>
            <p className="text-sm text-muted-foreground">
              Last incident: {risk?.lastIncident}
            </p>
          </button>
        ))}
      </div>
      {/* Selected Risk Details */}
      {selectedRisk && (
        <div className="border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-lg ${getRiskSeverityColor(selectedRisk?.severity)}`}>
              <Icon name={getRiskIcon(selectedRisk?.type)} size={24} />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-lg text-foreground capitalize">
                {selectedRisk?.type} Risk Assessment
              </h4>
              <p className="text-sm text-muted-foreground">
                Risk Level: <span className="font-medium capitalize">{selectedRisk?.severity}</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-foreground mb-3">Risk Factors</h5>
              <ul className="space-y-2">
                {selectedRisk?.factors?.map((factor, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="ArrowRight" size={12} className="mt-1 text-muted-foreground" />
                    <span className="text-foreground">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-3">Preparation Steps</h5>
              <ul className="space-y-2">
                {selectedRisk?.preparations?.map((step, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="CheckCircle" size={12} className="mt-1 text-success" />
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="default" size="sm" iconName="BookOpen">
              Learn More
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Download Guide
            </Button>
            <Button variant="ghost" size="sm" iconName="Share">
              Share Info
            </Button>
          </div>
        </div>
      )}
      {/* Local Emergency Protocols */}
      <div className="border border-border rounded-lg p-6">
        <h4 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-secondary" />
          <span>Local Emergency Protocols</span>
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {localProtocols?.map((protocol, index) => (
            <div key={index} className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Phone" size={16} className="text-primary" />
                <h5 className="font-medium text-foreground">{protocol?.title}</h5>
              </div>
              
              <div className="space-y-2">
                {protocol?.contacts?.map((contact, contactIndex) => (
                  <div key={contactIndex} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{contact?.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-primary">{contact?.number}</span>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Icon name="Phone" size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {protocol?.location && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span>{protocol?.location}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-accent/10 to-warning/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-accent" />
            <h5 className="font-medium text-foreground">Emergency Evacuation Routes</h5>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            View interactive maps showing nearest evacuation centers and safe routes from your location.
          </p>
          <Button variant="outline" size="sm" iconName="Map">
            View Evacuation Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegionalContent;