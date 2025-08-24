import React from 'react';

const LoadingSpinner = React.memo(() => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
});

export default LoadingSpinner;
