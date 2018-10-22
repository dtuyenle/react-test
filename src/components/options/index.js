import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {color} from '../../utils/color';
import styled from 'styled-components';
import {Row, Col} from 'react-flexbox-grid';

const Container = styled(Row)`
  margin: 1.2em 0;
`;

const Label = styled(Row)`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;

const OptionContainer = styled(Row)`
  border: 1px solid ${color.grey_dark};
`;

const Option = styled(Col)`
  background: ${props => props.selected ? color.main : color.white};
  color: ${props => props.selected ? color.white : color.black};
  border-right: ${props => props.border === 'true' ? '1px solid ' + color.grey_dark : 'none'};
  padding: 0.8em;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
`;

class Options extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string,
    selected: PropTypes.string,
    border: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    border: true,
    disabled: false
  };

  getOptions() {
    const {data, selected} = this.props;
    return (<OptionContainer>
        {data.map((item, index) => (
        <Option
          key={index}
          selected={selected === item.value}
          onClick={this.props.onClick.bind(this, item)}
          xs={Math.round(12/data.length)}
          md={Math.round(12/data.length)}
          border={index === data.length - 1 ? 'false' : 'true'}
        >
          {item.name}
        </Option>))}
    </OptionContainer>);
  }

  render() {
    const {label} = this.props;
    return (<Container>
      <Col xs={12} md={12}>
        {label && <Label>{label}</Label>}
        {this.getOptions()}
      </Col>
    </Container>);
  }
};

export default Options;
