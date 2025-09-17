import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactCard = ({ contact, onCall, onMessage }) => {
  const getContactIcon = (type) => {
    switch (type) {
      case 'police':
        return 'Shield';
      case 'fire':
        return 'Flame';
      case 'medical':
        return 'Heart';
      case 'disaster':
        return 'AlertTriangle';
      case 'school':
        return 'GraduationCap';
      case 'family':
        return 'Users';
      default:
        return 'Phone';
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case 'police':
        return 'text-blue-600';
      case 'fire':
        return 'text-red-600';
      case 'medical':
        return 'text-green-600';
      case 'disaster':
        return 'text-orange-600';
      case 'school':
        return 'text-purple-600';
      case 'family':
        return 'text-indigo-600';
      default:
        return 'text-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full bg-background ${getContactColor(contact?.type)}`}>
          <Icon name={getContactIcon(contact?.type)} size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground mb-1">
            {contact?.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {contact?.department}
          </p>
          
          <div className="space-y-1 mb-3">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-foreground font-mono">{contact?.phone}</span>
            </div>
            
            {contact?.email && (
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{contact?.email}</span>
              </div>
            )}
            
            {contact?.address && (
              <div className="flex items-start space-x-2 text-sm">
                <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{contact?.address}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => onCall(contact?.phone)}
              className="flex-1"
            >
              <Icon name="Phone" size={14} className="mr-1" />
              Call
            </Button>
            
            {contact?.sms && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMessage(contact?.phone)}
                className="flex-1"
              >
                <Icon name="MessageSquare" size={14} className="mr-1" />
                SMS
              </Button>
            )}
          </div>

          {contact?.available24x7 && (
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">24/7 Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactCard;