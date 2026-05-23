import { Component, Suspense, lazy, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

class SplineBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return <>{this.props.fallback}</>;
    return this.props.children;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: ReactNode;
}

export function SplineScene({ scene, className, fallback = null }: SplineSceneProps) {
  return (
    <SplineBoundary fallback={fallback}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader" />
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineBoundary>
  );
}
