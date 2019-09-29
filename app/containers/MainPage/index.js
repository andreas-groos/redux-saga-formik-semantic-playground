import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import {
//   Button,
//   notification,
//   Row,
//   Col,
//   Layout,
//   List,
//   Typography,
//   Avatar,
//   Icon,
// } from 'antd';
import { Grid, Button, Confirm, List, Image, Icon } from 'semantic-ui-react';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMainPage from './selectors';
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

// const { Title } = Typography;

export function MainPage(props) {
  useInjectReducer({ key: 'mainPage', reducer });
  useInjectSaga({ key: 'mainPage', saga });
  const fetchData = () => {
    props.loadApi();
  };

  const handleListClick = (e, value) => {
    console.log(' value', value);
  };

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            {/* // <Title>Fetching Data example</Title> */}
            <Toasts />
            <Button size="large" onClick={fetchData}>
              {props.mainPage.loading ? 'Fetching' : 'Fetch Data'}
            </Button>
          </Grid.Column>
        </Grid.Row>
        <br />
        <Grid.Row>
          <Grid.Column>
            <List divided relaxed size="big">
              {props.mainPage.data.map((d, i) => {
                return (
                  <List.Item key={i} onClick={e => handleListClick(e, d)}>
                    <List.Content floated="right">
                      <Icon
                        disabled
                        name={d.completed ? 'check' : 'close'}
                        color={d.completed ? 'green' : 'red'}
                      />
                    </List.Content>
                    <Image
                      avatar
                      src={`https://i.pravatar.cc/200?img=${i % 70}`}
                    />
                    <List.Content>
                      <List.Header>{d.title}</List.Header>
                      <List.Description as="p">{`User ID: ${i}`}</List.Description>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Grid.Column>
        </Grid.Row>
        {/* <Row>
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
      </Row> */}
      </Grid>
      <Confirm
        open={props.mainPage.confirmationModal}
        header="Do you want to fetch additional data"
        onCancel={props.loadApiAbort}
        onConfirm={props.loadApiConfirm}
      />
    </div>
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
