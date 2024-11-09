import { useMemo } from 'react';

export const useGreeting = () => {
  return useMemo(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    };

    const getGreetingIcon = () => {
      const greeting = getGreeting();
      return greeting === 'Good Evening' ? 'moon-outline' : 'sunny-outline';
    };

    return {
      greeting: getGreeting(),
      greetingIcon: getGreetingIcon(),
    };
  }, []);
}; 