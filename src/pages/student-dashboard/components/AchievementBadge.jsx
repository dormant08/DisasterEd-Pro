import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ badge, isNew = false, onClick }) => {
  const getBadgeColor = (level) => {
    switch (level) {
      case 'gold':
        return 'from-yellow-400 to-yellow-600 text-white';
      case 'silver':
        return 'from-gray-300 to-gray-500 text-white';
      case 'bronze':
        return 'from-orange-400 to-orange-600 text-white';
      default:
        return 'from-primary to-primary/80 text-primary-foreground';
    }
  };

  return (
    <div 
      className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-card ${
        badge?.earned ? 'bg-card border-border' : 'bg-muted/50 border-muted opacity-60'
      }`}
      onClick={onClick}
    >
      {isNew && badge?.earned && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center animate-pulse">
          <span className="text-xs font-bold text-error-foreground">!</span>
        </div>
      )}
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${getBadgeColor(badge?.level)} flex items-center justify-center shadow-lg`}>
          <Icon name={badge?.icon} size={28} />
        </div>
        
        <h4 className={`font-heading font-semibold text-sm mb-1 ${
          badge?.earned ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {badge?.name}
        </h4>
        
        <p className={`text-xs ${
          badge?.earned ? 'text-muted-foreground' : 'text-muted-foreground/60'
        }`}>
          {badge?.description}
        </p>
        
        {badge?.earned && badge?.earnedDate && (
          <div className="mt-2 text-xs text-success font-medium">
            Earned {badge?.earnedDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;