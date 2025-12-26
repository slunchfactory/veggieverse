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

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
          <div className="max-w-md w-full bg-white rounded-none shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-2">오류가 발생했습니다</h1>
            <p className="text-stone-600 mb-6">
              레시피를 불러오는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-stone-500 cursor-pointer mb-2">
                  오류 상세 정보
                </summary>
                <pre className="text-xs text-stone-400 bg-stone-50 p-3 rounded-none overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex gap-3 justify-center">
              <Link
                to="/recipe"
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-none font-medium hover:bg-stone-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                레시피 목록으로
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-700 rounded-none font-medium hover:bg-stone-200 transition-colors"
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

