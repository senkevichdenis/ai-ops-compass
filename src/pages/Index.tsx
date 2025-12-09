import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuizState } from '@/hooks/useQuizState';
import { Landing } from './Landing';
import { Quiz } from './Quiz';
import { LeadCapture } from './LeadCapture';
import { Results } from './Results';
import { sendLeadWebhook } from '@/utils/sendWebhook';
import { toast } from 'sonner';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [isSharedView, setIsSharedView] = useState(false);

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
    exitToLanding,
    getCurrentSection,
    getScores,
    setScoresFromParams,
  } = useQuizState();

  // Handle shared results URL
  useEffect(() => {
    const salesParam = searchParams.get('s');
    const marketingParam = searchParams.get('m');
    const opsParam = searchParams.get('o');

    if (salesParam && marketingParam && opsParam) {
      const sales = parseInt(salesParam, 10);
      const marketing = parseInt(marketingParam, 10);
      const ops = parseInt(opsParam, 10);

      if (!isNaN(sales) && !isNaN(marketing) && !isNaN(ops)) {
        setIsSharedView(true);
        setScoresFromParams(sales, marketing, ops);
      }
    }
  }, [searchParams, setScoresFromParams]);

  const handleSubmitLead = async (data: { name: string; email: string }) => {
    const scores = getScores();
    await sendLeadWebhook(data, scores, state.answers);
    submitLead(data);
    toast.success("Results sent! Check your inbox within 5 minutes.");
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
            onExit={exitToLanding}
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
            isSharedView={isSharedView}
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
