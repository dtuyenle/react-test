import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {color} from '../../utils/color';
import {Grid, Row, Col} from 'react-flexbox-grid';
import styled from 'styled-components';

const ContainerGrid = styled(Grid)`
  border: 1px solid ${color.grey_dark};
  margin: 1em;
`;

const Header = styled(Row)`
  background: ${color.grey};
  margin-right: -16px;
  margin-left: -16px;
  padding: 1.2em 0.5em;
  font-weight: 600;
  font-size: 1.2em;
  border-bottom: 1px solid #CCC;
`;

const Footer = styled(Row)`
  margin-right: -16px;
  margin-left: -16px;
  border-top: 1px solid #CCC;
  min-height: 2em;
`;

const Content = styled(Col)`
  min-height: 5em;
`;

class Container extends Component {

  static propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node,
  };

  render() {
    const {header, children, footer} = this.props;
    return (<ContainerGrid fluid>
      {header &&
      <Header>
        <Col xs={12} md={12}>
          {header}
        </Col>
      </Header>}
      <Row>
        <Content xs={12} md={12}>
          {children}
        </Content>
      </Row>
      {footer &&
      <Footer>
        <Col xs={12} md={12}>
          {footer}
        </Col>
      </Footer>}
    </ContainerGrid>);
  }
};

export default Container;
