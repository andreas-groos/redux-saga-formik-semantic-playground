import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

function BasicModal(props) {
  return (
    <div>
      <Modal
        title="Confirm data fetching"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <p>We need your permission to fetch the data</p>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

export default BasicModal;
