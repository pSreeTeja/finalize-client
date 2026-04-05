import React from 'react';
import './Toast.css';

/**
 * Toast component for displaying temporary notifications
 * Usage: <Toast message="Success" type="success" visible={true} />
 */
class Toast extends React.Component {
  componentDidMount() {
    if (this.props.visible && this.props.autoClose !== false) {
      const delay = this.props.autoCloseDuration || 3000;
      this.timeout = setTimeout(() => {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }, delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const {
      visible,
      message,
      type = 'info',
      onClose,
    } = this.props;

    if (!visible) return null;

    return (
      <div className={`toast toast-${type}`} role="status" aria-live="polite">
        <div className="toast-content">
          {this.renderIcon(type)}
          <span className="toast-message">{message}</span>
        </div>
        {onClose && (
          <button
            className="toast-close"
            onClick={onClose}
            aria-label="Close notification"
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  renderIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return <span className="toast-icon">{icons[type] || '•'}</span>;
  }
}

export default Toast;
