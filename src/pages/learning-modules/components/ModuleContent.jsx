import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ModuleContent = ({ module, currentLesson, onLessonComplete, onNavigateLesson, onCloseModule }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      setQuizCompleted(true);
      setTimeout(() => {
        onLessonComplete();
        setShowQuiz(false);
        setSelectedAnswer(null);
        setQuizCompleted(false);
      }, 2000);
    }
  };

  const renderVideoContent = () => (
    <div className="bg-black rounded-lg overflow-hidden mb-6">
      <div className="aspect-video relative">
        <Image
          src={currentLesson?.videoThumbnail}
          alt={currentLesson?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="default"
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            iconName="Play"
            iconSize={24}
          >
            Play Video
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentLesson?.videoDuration}
        </div>
      </div>
    </div>
  );

  const renderTextContent = () => (
    <div className="prose prose-slate max-w-none mb-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
          {currentLesson?.title}
        </h2>
        <div className="text-foreground leading-relaxed space-y-4">
          {currentLesson?.content?.split('\n')?.map((paragraph, index) => (
            <p key={index} className="text-sm">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInteractiveContent = () => (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-warning" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Interactive Activity
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {currentLesson?.interactiveElements?.map((element, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <h4 className="font-medium text-foreground">{element?.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {element?.description}
            </p>
            <Button variant="outline" size="sm" iconName="ArrowRight">
              Try Activity
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="HelpCircle" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Quick Assessment
        </h3>
      </div>
      
      <div className="mb-4">
        <p className="text-foreground font-medium mb-4">
          {currentLesson?.quiz?.question}
        </p>
        
        <div className="space-y-2">
          {currentLesson?.quiz?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              disabled={quizCompleted}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                quizCompleted
                  ? index === currentLesson?.quiz?.correctAnswer
                    ? 'border-success bg-success/10 text-success'
                    : index === selectedAnswer && index !== currentLesson?.quiz?.correctAnswer
                    ? 'border-error bg-error/10 text-error' :'border-border bg-muted text-muted-foreground'
                  : selectedAnswer === index
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  quizCompleted && index === currentLesson?.quiz?.correctAnswer
                    ? 'border-success bg-success'
                    : selectedAnswer === index
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {((quizCompleted && index === currentLesson?.quiz?.correctAnswer) || 
                    (selectedAnswer === index)) && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {!quizCompleted && (
        <Button
          variant="default"
          onClick={handleQuizSubmit}
          disabled={selectedAnswer === null}
          iconName="Check"
          iconPosition="left"
        >
          Submit Answer
        </Button>
      )}
      
      {quizCompleted && (
        <div className="flex items-center space-x-2 text-success">
          <Icon name="CheckCircle" size={16} />
          <span className="text-sm font-medium">Correct! Moving to next lesson...</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onCloseModule}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Modules
              </Button>
              <div>
                <h1 className="font-heading font-semibold text-xl text-foreground">
                  {module.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Lesson {currentLesson?.id} of {module.totalLessons}: {currentLesson?.title}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ProgressIndicator
                progress={currentLesson?.id}
                total={module.totalLessons}
                label="Progress"
                showPercentage={false}
                showStats={false}
                size="sm"
                className="w-32"
              />
              <Button variant="ghost" size="sm" iconName="Bookmark">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {currentLesson?.type === 'video' && renderVideoContent()}
        {currentLesson?.type === 'text' && renderTextContent()}
        {currentLesson?.interactiveElements && renderInteractiveContent()}
        
        {/* Downloadable Resources */}
        {currentLesson?.resources && (
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Download" size={20} className="text-secondary" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Downloadable Resources
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
              {currentLesson?.resources?.map((resource, index) => (
                <div key={index} className="flex items-center justify-between bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{resource?.name}</p>
                      <p className="text-xs text-muted-foreground">{resource?.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {currentLesson?.quiz && !showQuiz && (
          <div className="text-center mb-6">
            <Button
              variant="default"
              onClick={() => setShowQuiz(true)}
              iconName="Brain"
              iconPosition="left"
            >
              Take Quick Assessment
            </Button>
          </div>
        )}
        
        {showQuiz && currentLesson?.quiz && renderQuiz()}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onNavigateLesson('prev')}
            disabled={currentLesson?.id === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous Lesson
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
            >
              Restart Lesson
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
            >
              Share
            </Button>
          </div>
          
          <Button
            variant="default"
            onClick={() => onNavigateLesson('next')}
            disabled={currentLesson?.id === module.totalLessons}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleContent;