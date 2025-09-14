import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Suppress ResizeObserver loop errors (common with charting libraries)
const resizeObserverErrorHandler = (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    return true;
  }
  return false;
};

window.addEventListener('error', (e) => {
  if (resizeObserverErrorHandler(e.error)) {
    e.preventDefault();
    e.stopPropagation();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
