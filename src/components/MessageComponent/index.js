import React from "react";
import Alert from "react-bootstrap/Alert";
import "./MessageComponent.scss";

class MessageComponent extends React.Component {
  render() {
    const { messageType, message, handleClose, dismissible, show } = this.props;
    return (
      show &&
      message && (
        <div className="message-wrapper">
          <Alert
            variant={messageType}
            dismissible={dismissible}
            onClose={handleClose}
          >
            {message}
          </Alert>
        </div>
      )
    );
  }
}

MessageComponent.defaultProps = {
  show: true,
  message: "Oh snap! You got an error!",
  messageType: "danger",
  dismissible: true,
  handleClose: () => {},
};

export default MessageComponent;
