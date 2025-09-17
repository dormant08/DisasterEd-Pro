import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DrillControls = ({ 
  onStartDrill, 
  onPauseDrill, 
  onResetDrill, 
  onSettingsChange,
  isActive, 
  isPaused, 
  settings 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const difficultyOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Basic scenarios with guidance' },
    { value: 'intermediate', label: 'Intermediate', description: 'Moderate complexity scenarios' },
    { value: 'advanced', label: 'Advanced', description: 'Complex multi-step scenarios' }
  ];

  const speedOptions = [
    { value: 'slow', label: 'Slow Pace', description: 'More time to think and respond' },
    { value: 'normal', label: 'Normal Pace', description: 'Standard timing for scenarios' },
    { value: 'fast', label: 'Fast Pace', description: 'Quick decision-making required' }
  ];

  const feedbackOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Instant feedback after each decision' },
    { value: 'delayed', label: 'End of Drill', description: 'Feedback provided at completion' },
    { value: 'minimal', label: 'Minimal', description: 'Basic feedback only' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleQuickStart = () => {
    onStartDrill();
  };

  const getControlButtonVariant = (action) => {
    switch (action) {
      case 'start':
        return 'default';
      case 'pause':
        return 'outline';
      case 'reset':
        return 'ghost';
      default:
        return 'outline';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl mb-1">
            Drill Controls
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your simulation settings and controls
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          iconName="Settings"
          iconPosition="left"
        >
          Settings
        </Button>
      </div>
      {/* Main Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {!isActive ? (
            <Button
              variant={getControlButtonVariant('start')}
              size="default"
              onClick={handleQuickStart}
              iconName="Play"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              Start Drill
            </Button>
          ) : (
            <>
              <Button
                variant={getControlButtonVariant('pause')}
                size="default"
                onClick={onPauseDrill}
                iconName={isPaused ? "Play" : "Pause"}
                iconPosition="left"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              
              <Button
                variant={getControlButtonVariant('reset')}
                size="default"
                onClick={onResetDrill}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="default"
            iconName="HelpCircle"
            iconPosition="left"
          >
            Help
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="font-heading font-medium mb-3">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 text-center border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200">
            <Icon name="Zap" size={20} className="mx-auto mb-2 text-warning" />
            <p className="text-xs font-medium">Earthquake</p>
          </button>
          
          <button className="p-3 text-center border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200">
            <Icon name="Flame" size={20} className="mx-auto mb-2 text-error" />
            <p className="text-xs font-medium">Fire Drill</p>
          </button>
          
          <button className="p-3 text-center border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200">
            <Icon name="Droplets" size={20} className="mx-auto mb-2 text-primary" />
            <p className="text-xs font-medium">Flood</p>
          </button>
          
          <button className="p-3 text-center border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors duration-200">
            <Icon name="Shuffle" size={20} className="mx-auto mb-2 text-accent" />
            <p className="text-xs font-medium">Random</p>
          </button>
        </div>
      </div>
      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-border pt-6">
          <h3 className="font-heading font-medium mb-4">Drill Settings</h3>
          
          <div className="space-y-4">
            <Select
              label="Difficulty Level"
              description="Choose the complexity of scenarios"
              options={difficultyOptions}
              value={localSettings?.difficulty}
              onChange={(value) => handleSettingChange('difficulty', value)}
            />
            
            <Select
              label="Drill Speed"
              description="Control the pace of the simulation"
              options={speedOptions}
              value={localSettings?.speed}
              onChange={(value) => handleSettingChange('speed', value)}
            />
            
            <Select
              label="Feedback Timing"
              description="When to receive performance feedback"
              options={feedbackOptions}
              value={localSettings?.feedbackTiming}
              onChange={(value) => handleSettingChange('feedbackTiming', value)}
            />
          </div>

          {/* Additional Options */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-sm mb-3">Additional Options</h4>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings?.soundEffects}
                  onChange={(e) => handleSettingChange('soundEffects', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium">Sound Effects</p>
                  <p className="text-xs text-muted-foreground">Enable audio cues during drills</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings?.hints}
                  onChange={(e) => handleSettingChange('hints', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium">Show Hints</p>
                  <p className="text-xs text-muted-foreground">Display helpful tips during scenarios</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings?.autoAdvance}
                  onChange={(e) => handleSettingChange('autoAdvance', e?.target?.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium">Auto Advance</p>
                  <p className="text-xs text-muted-foreground">Automatically move to next scenario</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
      {/* Status Indicator */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isActive ? (isPaused ? 'bg-warning' : 'bg-success animate-pulse') : 'bg-muted-foreground'
            }`} />
            <span className="text-sm font-medium">
              {isActive ? (isPaused ? 'Paused' : 'Active') : 'Ready'}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {localSettings?.difficulty?.charAt(0)?.toUpperCase() + localSettings?.difficulty?.slice(1)} • {localSettings?.speed?.charAt(0)?.toUpperCase() + localSettings?.speed?.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillControls;