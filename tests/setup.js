/**
 * Jest Test Setup
 * Configures the testing environment for Navy BCA tests
 */

// Extend Jest with custom matchers
require('@testing-library/jest-dom');

// Mock localStorage
const localStorageMock = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = String(value);
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  },
  get length() {
    return Object.keys(this.store).length;
  },
  key: function(index) {
    return Object.keys(this.store)[index] || null;
  }
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

// Mock console.warn to track warnings in tests
global.originalConsoleWarn = console.warn;
global.consoleWarnings = [];
console.warn = (...args) => {
  global.consoleWarnings.push(args.join(' '));
  global.originalConsoleWarn(...args);
};

// Reset between tests
beforeEach(() => {
  localStorage.clear();
  global.consoleWarnings = [];
});

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
    readText: jest.fn().mockResolvedValue('')
  },
  writable: true
});

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock window.print
global.print = jest.fn();
