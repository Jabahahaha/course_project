import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = {
  children: ReactNode
}

type State = {
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info)
  }

  public render(): ReactNode {
    if (this.state.error) {
      return (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <h2>Something went wrong</h2>
          <p style={{ color: "#818384", fontSize: "0.9rem" }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              background: "none",
              border: "1px solid #3a3a3c",
              borderRadius: "4px",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
