import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  Button,
  notification,
  Row,
  Col,
  Layout,
  List,
  Typography,
  Avatar,
  Icon,
} from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainPage, { makeSelectToasts } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  defaultAction,
  loadApi,
  loadApiAbort,
  loadApiConfirm,
} from './actions';
import BasicModal from '../../components/BasicModal';
import InputForm from '../../components/InputForm';
import Toasts from '../Toasts/index';

const { Title } = Typography;

export function MainPage(props) {
  useInjectReducer({ key: 'mainPage', reducer });
  useInjectSaga({ key: 'mainPage', saga });
  useEffect(() => {
    if (props.mainPage.error) {
      notification.warning({
        message: 'Request aborted',
        description: props.mainPage.error,
      });
    }
    if (props.mainPage.data.length > 0) {
      notification.success({
        message: 'New data fetched',
        // description: props.mainPage.error,
      });
    }
  }, [props.mainPage.error, props.mainPage.data]);

  const fetchData = () => {
    props.loadApi();
  };

  return (
    <Layout>
      <Layout.Content>
        <Title>Fetching Data example</Title>
        {/* <Toasts /> */}
        <Row>
          <Col span={12} offset={6}>
            <Button size="large" block onClick={fetchData}>
              {props.mainPage.loading ? 'Fetching' : 'Fetch Data'}
            </Button>
          </Col>
        </Row>

        <br />
        <Row>
          <Col span={12} offset={6}>
            <InputForm />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <List
              size="large"
              header={<div>Users</div>}
              bordered
              dataSource={props.mainPage.data}
              renderItem={(item, i) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`https://i.pravatar.cc/200?img=${i % 70}`} />
                    }
                    title={item.title}
                    description={`User ID: ${i}`}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Layout.Content>
      <BasicModal
        handleCancel={() => {
          props.loadApiAbort();
        }}
        handleOk={() => {
          props.loadApiConfirm();
        }}
        visible={props.mainPage.confirmationModal}
      />
    </Layout>
  );
}

MainPage.propTypes = {
  // defaultAction: PropTypes.func,
  loadApi: PropTypes.func,
  loadApiConfirm: PropTypes.func,
  loadApiAbort: PropTypes.func,
  mainPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  mainPage: makeSelectMainPage(),
  toasts: makeSelectToasts(),
});

function mapDispatchToProps(dispatch) {
  return {
    defaultAction: text => dispatch(defaultAction(text)),
    loadApi: () => dispatch(loadApi()),
    loadApiConfirm: () => dispatch(loadApiConfirm()),
    loadApiAbort: () => dispatch(loadApiAbort()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MainPage);
