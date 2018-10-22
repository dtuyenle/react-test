import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {color} from '../../utils/color';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.disabled ? color.grey_dark : props.border ? color.white : color.main};
  text-align: center;
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  background: ${props => props.border ? color.main : color.white};
  margin: 1em auto;
  padding: 1em;
  width: 15em;
`;

class Button extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    border: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    border: true,
    disabled: false
  };

  render() {
    const {children, disabled, border, onClick} = this.props;
    return (<Container disabled={disabled} onClick={disabled ? undefined : onClick} border={border}>
      {children}
    </Container>);
  }
};

export default Button;
