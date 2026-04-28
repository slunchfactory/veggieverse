import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-cream px-4">
          <div className="max-w-md w-full bg-white rounded-none shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-black mb-2 font-normal" style={{ fontSize: 'var(--font-size-h1)', fontWeight: 400 }}>오류가 발생했습니다</h1>
            <p className="text-warm-gray mb-6">
              레시피를 불러오는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-warm-gray cursor-pointer mb-2">
                  오류 상세 정보
                </summary>
                <pre className="text-xs text-muted bg-cream p-3 rounded-none overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex gap-3 justify-center">
              <Link
                to="/recipe"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-none font-medium hover:bg-charcoal transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                레시피 목록으로
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-eggshell text-charcoal rounded-none font-medium hover:bg-[rgba(26,10,5,0.05)] transition-colors"
              >
                <Home className="w-4 h-4" />
                홈으로
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

