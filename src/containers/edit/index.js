import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {update} from '../../modules/vehicle';
import {Row, Col} from 'react-flexbox-grid';
import Container from '../../components/container';
import Button from '../../components/button';
import Options from '../../components/options';
import styled from 'styled-components';

const NoChange = styled.div`
  margin: 2em 0;
`;

const OptionContainer = styled(Col)`
  margin: 2em 0;
`;

const RowItem = styled(Row)`
  padding: 1em 0.5em;
`;

const RowItemRight = styled(Col)`
  text-align: right;
  font-weight: 600;
`;

class Edit extends Component {

  static propTypes = {
    vehicle: PropTypes.object,
    coverage: PropTypes.object,
    goToView: PropTypes.func,
    update: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.getInitialData()
    };
  }

  componentDidMount() {
    const {vehicle, coverage} = this.props;
    if (vehicle === null || coverage === null) {
      this.props.goToView();
    }
  }

  getInitialData() {
    return this.props.vehicle !== null ? Object.assign({}, this.props.vehicle) : null;
  }

  getHeader() {
    const {vehicle} = this.props;
    return vehicle !== null ? <div>{vehicle.name}</div> : '';
  }

  getFooter() {
    return [
      <Button border key="save" onClick={() => {
        this.props.update(this.state.data);
        this.props.goToView();
      }}>Save Changes</Button>,
      <Button border={false} key="cancel" onClick={() => {
        this.props.goToView();
      }}>Cancel Changes</Button>
    ];
  }

  getRowItems() {
    const {vehicle, coverage} = this.props;
    const Data = [];

    if (coverage !== null) {
      coverage.coverageOptions.map(option => {
        if (vehicle[option.name] && this.state.data[option.name] !== vehicle[option.name]) {
          const currSelected = option.options.filter(item => item.value === vehicle[option.name]);
          const newSelected = option.options.filter(item => item.value === this.state.data[option.name]);

          Data.push(<RowItem key={option.name}>
            <Col xs={8} md={8}>{option.title}</Col>
            <RowItemRight xs={4} md={4}>{currSelected[0].name} --> {newSelected[0].name}</RowItemRight>
          </RowItem>);
        }
        return '';
      });
    }
    return Data.length === 0 ? <NoChange>No Changes</NoChange> : Data;
  }

  getCoverageOptions() {
    const {coverage} = this.props;
    const {data} = this.state;
    return (<Container
      header={this.getHeader()}
    >
      <OptionContainer>
        {coverage !== null ?
        coverage.coverageOptions.map(option => {
          return (<Options
            label={option.title}
            key={option.name}
            data={option.options.map(optionItem => {
              return {
                ...optionItem,
                option: option.name
              };
            })}
            selected={data[option.name]}
            onClick={selected => {
              const newdata = Object.assign({}, this.state.data);
              newdata[selected.option] = selected.value;
              this.setState({data: newdata});
            }}
          />);
        }) : ''}
      </OptionContainer>
    </Container>);
  }

  render() {
    return (<div>
      {this.getCoverageOptions()}
      <Container
        header="Coverage Changes"
        footer={this.getFooter()}
      >
        {this.getRowItems()}
      </Container>
    </div>);
  }
};

const mapStateToProps = ({ vehicle, coverage }) => ({
  vehicle: vehicle.data,
  coverage: coverage.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update,
      goToView: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);



