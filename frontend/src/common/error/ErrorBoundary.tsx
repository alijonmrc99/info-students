import React from "react"
import { ErrorView } from "./ErrorView";

type ErrorBoundaryProps = {
    children: React.ReactNode
};

type ErrorBoundaryState = {
    hasError: boolean,
};

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error boundary catch error", error, errorInfo)
    }

    render(): React.ReactNode {
        if (this.state.hasError)
            return <ErrorView />
        return this.props.children
    }
}