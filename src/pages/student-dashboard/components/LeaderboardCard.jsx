import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaderboardCard = ({ currentUser, topUsers = [] }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return { icon: 'Crown', color: 'text-yellow-500' };
      case 2:
        return { icon: 'Medal', color: 'text-gray-400' };
      case 3:
        return { icon: 'Award', color: 'text-orange-500' };
      default:
        return { icon: 'User', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Leaderboard
        </h3>
        <Icon name="Trophy" size={20} className="text-warning" />
      </div>
      {/* Current User Position */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  {currentUser?.rank}
                </span>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">You</p>
              <p className="text-sm text-muted-foreground">
                {currentUser?.points} points
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-lg font-bold text-primary">#{currentUser?.rank}</p>
          </div>
        </div>
      </div>
      {/* Top Users */}
      <div className="space-y-3">
        {topUsers?.slice(0, 5)?.map((user, index) => {
          const rankInfo = getRankIcon(user?.rank);
          return (
            <div key={user?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {user?.rank <= 3 && (
                    <div className="absolute -top-1 -right-1">
                      <Icon name={rankInfo?.icon} size={14} className={rankInfo?.color} />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.school}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {user?.points}
                </p>
                <p className="text-xs text-muted-foreground">
                  #{user?.rank}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardCard;