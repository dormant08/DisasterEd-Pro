import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const SimulationArea = ({ 
  currentScenario, 
  onDecisionMade, 
  isPaused, 
  timeRemaining,
  showFeedback,
  feedbackMessage,
  feedbackType 
}) => {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [showDecisionFeedback, setShowDecisionFeedback] = useState(false);

  useEffect(() => {
    if (showFeedback) {
      setShowDecisionFeedback(true);
      const timer = setTimeout(() => {
        setShowDecisionFeedback(false);
        setSelectedDecision(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const handleDecisionSelect = (decision) => {
    if (isPaused || showDecisionFeedback) return;
    setSelectedDecision(decision);
    onDecisionMade(decision);
  };

  const getScenarioImage = (type) => {
    switch (type) {
      case 'earthquake':
        return 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&h=600&fit=crop';
      case 'fire':
        return 'https://images.unsplash.com/photo-1574869711670-c2c5c8b9e3c8?w=800&h=600&fit=crop';
      case 'flood':
        return 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop';
    }
  };

  const getUrgencyColor = () => {
    if (timeRemaining > 30) return 'text-success';
    if (timeRemaining > 15) return 'text-warning';
    return 'text-error';
  };

  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
        <div className="text-center">
          <Icon name="Play" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">
            Select a drill scenario to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-card rounded-lg border border-border overflow-hidden">
      {/* Scenario Header */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={getScenarioImage(currentScenario?.type)}
          alt={`${currentScenario?.type} simulation scenario`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with scenario info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={currentScenario?.type === 'earthquake' ? 'Zap' : 
                        currentScenario?.type === 'fire' ? 'Flame' : 'Droplets'} 
                  size={20} 
                  className="text-white" 
                />
                <span className="text-white font-heading font-semibold text-lg">
                  {currentScenario?.title}
                </span>
              </div>
              
              {/* Timer */}
              <div className={`flex items-center space-x-1 px-3 py-1 bg-black/50 rounded-full ${getUrgencyColor()}`}>
                <Icon name="Clock" size={16} />
                <span className="font-mono font-semibold">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60)?.toString()?.padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <p className="text-white/90 text-sm leading-relaxed">
              {currentScenario?.description}
            </p>
          </div>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Pause" size={48} className="mx-auto mb-2" />
              <p className="text-lg font-medium">Simulation Paused</p>
            </div>
          </div>
        )}
      </div>
      {/* Decision Area */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-heading font-semibold text-lg mb-2">
            What should you do next?
          </h3>
          <p className="text-muted-foreground text-sm">
            Choose the most appropriate action for this emergency situation.
          </p>
        </div>

        {/* Decision Options */}
        <div className="grid gap-3">
          {currentScenario?.decisions?.map((decision, index) => (
            <button
              key={index}
              onClick={() => handleDecisionSelect(decision)}
              disabled={isPaused || showDecisionFeedback}
              className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                selectedDecision === decision
                  ? decision?.isCorrect
                    ? 'border-success bg-success/10 text-success' :'border-error bg-error/10 text-error' :'border-border hover:border-primary hover:bg-primary/5'
              } ${isPaused || showDecisionFeedback ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  selectedDecision === decision
                    ? decision?.isCorrect
                      ? 'border-success bg-success text-white' :'border-error bg-error text-white' :'border-muted-foreground'
                }`}>
                  {selectedDecision === decision && (
                    <Icon 
                      name={decision?.isCorrect ? "Check" : "X"} 
                      size={12} 
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium mb-1">{decision?.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {decision?.reasoning}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback Message */}
        {showDecisionFeedback && feedbackMessage && (
          <div className={`mt-4 p-4 rounded-lg border ${
            feedbackType === 'correct' ?'border-success bg-success/10 text-success' :'border-warning bg-warning/10 text-warning'
          }`}>
            <div className="flex items-start space-x-2">
              <Icon 
                name={feedbackType === 'correct' ? "CheckCircle" : "AlertCircle"} 
                size={20} 
                className="flex-shrink-0 mt-0.5" 
              />
              <div>
                <p className="font-medium mb-1">
                  {feedbackType === 'correct' ? 'Excellent Choice!' : 'Learning Opportunity'}
                </p>
                <p className="text-sm opacity-90">{feedbackMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationArea;