import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ScenarioPanel = ({ 
  scenarios, 
  currentScenario, 
  onScenarioSelect, 
  progress,
  isSimulationActive,
  onStartSimulation,
  onPauseSimulation,
  onResetSimulation,
  isPaused 
}) => {
  const getScenarioIcon = (type) => {
    switch (type) {
      case 'earthquake':
        return 'Zap';
      case 'fire':
        return 'Flame';
      case 'flood':
        return 'Droplets';
      default:
        return 'AlertTriangle';
    }
  };

  const getScenarioColor = (type) => {
    switch (type) {
      case 'earthquake':
        return 'text-warning';
      case 'fire':
        return 'text-error';
      case 'flood':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const styles = {
      beginner: 'bg-success/10 text-success border-success/20',
      intermediate: 'bg-warning/10 text-warning border-warning/20',
      advanced: 'bg-error/10 text-error border-error/20'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles?.[difficulty]}`}>
        {difficulty?.charAt(0)?.toUpperCase() + difficulty?.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl mb-1">
            Drill Scenarios
          </h2>
          <p className="text-muted-foreground text-sm">
            Choose a disaster scenario to practice emergency response
          </p>
        </div>
        
        {currentScenario && (
          <div className="flex items-center space-x-2">
            {!isSimulationActive ? (
              <Button
                variant="default"
                size="sm"
                onClick={onStartSimulation}
                iconName="Play"
                iconPosition="left"
              >
                Start Drill
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPauseSimulation}
                  iconName={isPaused ? "Play" : "Pause"}
                  iconPosition="left"
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onResetSimulation}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Progress Indicator */}
      {currentScenario && isSimulationActive && (
        <div className="mb-6">
          <ProgressIndicator
            progress={progress?.current}
            total={progress?.total}
            label="Drill Progress"
            variant="default"
            size="default"
            showPercentage={true}
            showStats={true}
          />
        </div>
      )}
      {/* Scenario List */}
      <div className="space-y-3">
        {scenarios?.map((scenario) => (
          <div
            key={scenario?.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              currentScenario?.id === scenario?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => onScenarioSelect(scenario)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-muted ${getScenarioColor(scenario?.type)}`}>
                  <Icon name={getScenarioIcon(scenario?.type)} size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-base mb-1">
                    {scenario?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Duration: {scenario?.duration} minutes
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                {getDifficultyBadge(scenario?.difficulty)}
                {scenario?.completed && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {scenario?.description}
            </p>

            {/* Scenario Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{scenario?.participants} participants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={12} />
                  <span>{scenario?.objectives} objectives</span>
                </div>
              </div>
              
              {scenario?.bestScore && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="Trophy" size={12} />
                  <span>Best: {scenario?.bestScore}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-sm mb-1">Drill Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Take your time to read each scenario carefully</li>
              <li>• Think about real-world safety protocols</li>
              <li>• Learn from feedback to improve your response</li>
              <li>• Practice regularly to build muscle memory</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPanel;