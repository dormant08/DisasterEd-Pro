import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'module_completed':
        return { icon: 'BookOpen', color: 'text-success' };
      case 'badge_earned':
        return { icon: 'Award', color: 'text-warning' };
      case 'quiz_completed':
        return { icon: 'CheckCircle', color: 'text-primary' };
      case 'drill_participated':
        return { icon: 'Play', color: 'text-accent' };
      case 'level_up':
        return { icon: 'TrendingUp', color: 'text-secondary' };
      default:
        return { icon: 'Activity', color: 'text-muted-foreground' };
    }
  };

  const getActivityMessage = (activity) => {
    switch (activity?.type) {
      case 'module_completed':
        return `completed the module "${activity?.details?.moduleName}"`;
      case 'badge_earned':
        return `earned the "${activity?.details?.badgeName}" badge`;
      case 'quiz_completed':
        return `scored ${activity?.details?.score}% in "${activity?.details?.quizName}" quiz`;
      case 'drill_participated':
        return `participated in ${activity?.details?.drillType} drill simulation`;
      case 'level_up':
        return `reached Level ${activity?.details?.newLevel}`;
      default:
        return activity?.message || 'performed an activity';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Recent Activity
        </h3>
        <Icon name="Activity" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activities</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start learning to see your progress here!
            </p>
          </div>
        ) : (
          activities?.map((activity) => {
            const activityIcon = getActivityIcon(activity?.type);
            return (
              <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div className="flex-shrink-0">
                  {activity?.user?.avatar ? (
                    <div className="relative">
                      <Image
                        src={activity?.user?.avatar}
                        alt={activity?.user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-card border border-border rounded-full flex items-center justify-center">
                        <Icon name={activityIcon?.icon} size={12} className={activityIcon?.color} />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${activityIcon?.color}`}>
                      <Icon name={activityIcon?.icon} size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">
                          {activity?.user?.name || 'You'}
                        </span>{' '}
                        {getActivityMessage(activity)}
                      </p>
                      
                      {activity?.details?.points && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Icon name="Plus" size={12} className="text-success" />
                          <span className="text-xs text-success font-medium">
                            +{activity?.details?.points} points
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            View All Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;