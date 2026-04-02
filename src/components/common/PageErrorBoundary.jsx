import { Component } from 'react'
import { Button } from './Button.jsx'

export class PageErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6">
          <p className="text-lg font-semibold text-rose-700">{this.props.pageName ?? 'This page'}</p>
          <p className="mt-2 text-sm text-rose-600">Something went wrong while rendering this section.</p>
          <div className="mt-4">
            <Button onClick={() => this.setState({ hasError: false })}>Retry</Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
