import { useState, useEffect, useCallback } from 'react';

export type Screen = 'landing' | 'quiz' | 'transition' | 'leadCapture' | 'results';

export interface LeadData {
  name: string;
  email: string;
}

export interface QuizState {
  currentScreen: Screen;
  currentQuestion: number;
  answers: (number | null)[];
  leadData: LeadData | null;
}

const STORAGE_KEY = 'ai-ops-scorecard-progress';
const EXPIRY_HOURS = 24;

interface StoredProgress {
  currentQuestion: number;
  answers: (number | null)[];
  savedAt: string;
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>({
    currentScreen: 'landing',
    currentQuestion: 0,
    answers: Array(15).fill(null),
    leadData: null,
  });

  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Check for saved progress on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const progress: StoredProgress = JSON.parse(stored);
        const savedTime = new Date(progress.savedAt).getTime();
        const now = Date.now();
        const hoursDiff = (now - savedTime) / (1000 * 60 * 60);

        if (hoursDiff < EXPIRY_HOURS && progress.answers.some(a => a !== null)) {
          setHasSavedProgress(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveProgress = useCallback((question: number, answers: (number | null)[]) => {
    const progress: StoredProgress = {
      currentQuestion: question,
      answers,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, []);

  const loadProgress = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const progress: StoredProgress = JSON.parse(stored);
        setState(prev => ({
          ...prev,
          currentScreen: 'quiz',
          currentQuestion: progress.currentQuestion,
          answers: progress.answers,
        }));
        setHasSavedProgress(false);
      } catch {
        startQuiz();
      }
    }
  }, []);

  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedProgress(false);
  }, []);

  const startQuiz = useCallback(() => {
    clearProgress();
    setState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      currentQuestion: 0,
      answers: Array(15).fill(null),
    }));
  }, [clearProgress]);

  const answerQuestion = useCallback((score: number) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestion] = score;
      
      saveProgress(prev.currentQuestion, newAnswers);
      
      return {
        ...prev,
        answers: newAnswers,
      };
    });

    // Auto-advance after delay
    setTimeout(() => {
      setState(prev => {
        const nextQuestion = prev.currentQuestion + 1;
        
        // Check if we're at a section transition
        if (nextQuestion === 5 || nextQuestion === 10) {
          return { ...prev, currentScreen: 'transition' };
        }
        
        // Check if quiz is complete
        if (nextQuestion >= 15) {
          clearProgress();
          return { ...prev, currentScreen: 'leadCapture' };
        }
        
        return { ...prev, currentQuestion: nextQuestion };
      });
    }, 300);
  }, [saveProgress, clearProgress]);

  const goToPreviousQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestion > 0) {
        return { ...prev, currentQuestion: prev.currentQuestion - 1 };
      }
      return prev;
    });
  }, []);

  const continueFromTransition = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      currentQuestion: prev.currentQuestion + 1,
    }));
  }, []);

  const submitLead = useCallback((data: LeadData) => {
    setState(prev => ({
      ...prev,
      leadData: data,
      currentScreen: 'results',
    }));
  }, []);

  const skipLead = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'results',
    }));
  }, []);

  const restartQuiz = useCallback(() => {
    clearProgress();
    setState({
      currentScreen: 'landing',
      currentQuestion: 0,
      answers: Array(15).fill(null),
      leadData: null,
    });
  }, [clearProgress]);

  const getCurrentSection = useCallback(() => {
    const q = state.currentQuestion;
    if (q < 5) return 'sales';
    if (q < 10) return 'marketing';
    return 'ops';
  }, [state.currentQuestion]);

  const getScores = useCallback(() => {
    const answers = state.answers.map(a => a ?? 0);
    return {
      sales: answers.slice(0, 5).reduce((a, b) => a + b, 0),
      marketing: answers.slice(5, 10).reduce((a, b) => a + b, 0),
      ops: answers.slice(10, 15).reduce((a, b) => a + b, 0),
      total: answers.reduce((a, b) => a + b, 0),
    };
  }, [state.answers]);

  return {
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
  };
}
