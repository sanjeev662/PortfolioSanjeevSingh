// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// jsdom implements neither of these, and framer-motion's `whileInView` plus our
// theme context reach for them during the very first render — without stubs,
// every test dies before it can assert anything. The app's own hooks already
// guard for a missing IntersectionObserver; framer-motion's internals do not.

if (typeof window.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback;
    }
    // Report the element as visible so reveal-on-scroll content is present in
    // tests, rather than stuck at opacity 0.
    observe(target) {
      this.callback([{ isIntersecting: true, target, intersectionRatio: 1 }], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  window.IntersectionObserver = IntersectionObserverStub;
  global.IntersectionObserver = IntersectionObserverStub;
}

if (typeof window.matchMedia === "undefined") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom logs "Not implemented: window.scrollTo" on every route change.
window.scrollTo = () => {};
