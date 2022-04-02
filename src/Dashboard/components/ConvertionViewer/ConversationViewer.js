import React from 'react';

const styles = {
  button: {
    width: '30px',
    height: '30px',
    borderRadius: '40px',
    border: '2px solid #e6e5e8',
    textDecoration: 'none',
    backgroundColor: '#1c87c9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
    boxShadow: 'none',
    borderImage: 'none',
    borderStyle: 'none',
    borderWidth: '0px',
    outline: 'none'
  }
};

const ConversationViewer = (props) => {
  const { onClickHandler } = props;
  return (
    <button style={styles.button} onClick={onClickHandler}>
      {props.children}
    </button>
  );
};

export default ConversationViewer;
