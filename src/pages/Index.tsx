import { useQuizState } from '@/hooks/useQuizState';
import { Landing } from './Landing';
import { Quiz } from './Quiz';
import { LeadCapture } from './LeadCapture';
import { Results } from './Results';
import { sendLeadWebhook } from '@/utils/sendWebhook';

const Index = () => {
  const {
    state,
    hasSavedProgress,
    startQuiz,
    loadProgress,
    answerQuestion,
    goToPreviousQuestion,
    continueFromTransition,
    submitLead,
    skipLead,
    restartQuiz,
    getCurrentSection,
    getScores,
  } = useQuizState();

  const handleSubmitLead = (data: { name: string; email: string }) => {
    const scores = getScores();
    sendLeadWebhook(data, scores, state.answers);
    submitLead(data);
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'landing':
        return (
          <Landing
            onStart={startQuiz}
            onResume={hasSavedProgress ? loadProgress : undefined}
            hasSavedProgress={hasSavedProgress}
          />
        );

      case 'quiz':
      case 'transition':
        return (
          <Quiz
            currentQuestion={state.currentQuestion}
            currentSection={getCurrentSection()}
            answers={state.answers}
            showTransition={state.currentScreen === 'transition'}
            onAnswer={answerQuestion}
            onBack={goToPreviousQuestion}
            onContinueFromTransition={continueFromTransition}
          />
        );

      case 'leadCapture':
        return (
          <LeadCapture
            onSubmit={handleSubmitLead}
            onSkip={skipLead}
          />
        );

      case 'results':
        return (
          <Results
            scores={getScores()}
            answers={state.answers}
            leadData={state.leadData}
            onRestart={restartQuiz}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {renderScreen()}
    </main>
  );
};

export default Index;
