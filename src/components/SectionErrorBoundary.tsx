import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Contains a crash to just the section it wraps. Without this, an uncaught
 * error anywhere in one section (e.g. a WebGL background failing on an
 * unusual GPU/driver) unmounts the entire page, since React walks up to the
 * nearest error boundary on an uncaught render/effect error — and this app
 * has none otherwise, so one bad section would blank the whole site.
 */
export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[SectionErrorBoundary] a section crashed and was skipped:", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
