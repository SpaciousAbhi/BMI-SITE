import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

// Comprehensive ResizeObserver error suppression
const suppressResizeObserverErrors = () => {
  // Suppress ResizeObserver loop limit exceeded errors
  const resizeObserverErr = /^ResizeObserver loop (limit exceeded|completed with undelivered notifications)/;
  
  // Override console.error to filter out ResizeObserver errors
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args.length > 0 && typeof args[0] === 'string' && resizeObserverErr.test(args[0])) {
      return; // Suppress ResizeObserver errors
    }
    originalConsoleError.apply(console, args);
  };

  // Handle uncaught errors
  window.addEventListener('error', (e) => {
    if (e.message && resizeObserverErr.test(e.message)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return true;
    }
  }, true);

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason && e.reason.message && resizeObserverErr.test(e.reason.message)) {
      e.preventDefault();
      return true;
    }
  });

  // Override ResizeObserver to catch errors at source
  if (typeof window !== 'undefined' && window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        super((entries, observer) => {
          try {
            callback(entries, observer);
          } catch (error) {
            if (!resizeObserverErr.test(error.message)) {
              throw error;
            }
          }
        });
      }
    };
  }
};

// Initialize error suppression
suppressResizeObserverErrors();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
