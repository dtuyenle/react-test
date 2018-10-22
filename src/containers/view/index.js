import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load as loadVehicle} from '../../modules/vehicle';
import {load as loadCoverage} from '../../modules/coverage';
import {ClipLoader} from 'react-spinners';
import {color} from '../../utils/color';
import {Row, Col} from 'react-flexbox-grid';
import Container from '../../components/container';
import Button from '../../components/button';
import styled from 'styled-components';

const RowItem = styled(Row)`
  padding: 1em 0.5em;
`;

const RowItemRight = styled(Col)`
  text-align: right;
  font-weight: 600;
`;

class View extends Component {

  static propTypes = {
    loaded_vehicle: PropTypes.bool,
    loading_vehicle: PropTypes.bool,
    vehicle: PropTypes.object,
    loaded_coverage: PropTypes.bool,
    loading_coverage: PropTypes.bool,
    coverage: PropTypes.object,
    loadVehicle: PropTypes.func,
    loadCoverage: PropTypes.func,
    goToEdit: PropTypes.func
  };

  componentDidMount() {
    const {vehicle, coverage} = this.props;
    if (vehicle === null) {
      this.props.loadVehicle();
    }
    if (coverage === null) {
      this.props.loadCoverage();
    }
  }

  vehicleLoaded() {
    const {loading_vehicle, loaded_vehicle, vehicle} = this.props;
    return !loading_vehicle && loaded_vehicle && vehicle && vehicle !== null;
  }

  coverageLoaded() {
    const {loading_coverage, loaded_coverage, coverage} = this.props;
    return !loading_coverage && loaded_coverage && coverage && coverage !== null;
  }

  vehicleLoading() {
    const {loading_vehicle, loaded_vehicle} = this.props;
    return loading_vehicle && !loaded_vehicle;
  }

  coverageLoading() {
    const {loading_coverage, loaded_coverage} = this.props;
    return loading_coverage && !loaded_coverage;
  }

  checkLoaded() {
    return this.vehicleLoaded() && this.coverageLoaded();
  }

  checkLoading() {
    return this.vehicleLoading() && this.coverageLoading();
  }

  getHeader() {
    const {vehicle} = this.props;
    return this.vehicleLoaded() ? <div>{vehicle.name}</div> : '';
  }

  getFooter() {
    return <Button
      disabled={!this.checkLoaded()}
      border={false}
      onClick={() => {
        console.log('fsdfsd');
        this.props.goToEdit();
      }}>
      Edit Coverage
    </Button>;
  }

  getRowItems() {
    const {vehicle, coverage} = this.props;
    console.log(this.props);
    if (this.checkLoaded()) {
      return coverage.coverageOptions.map(option => {
        const selected = option.options.filter(item => item.value === vehicle[option.name]);

        return vehicle[option.name] ? 
          <RowItem key={option.name}>
            <Col xs={8} md={8}>{option.title}</Col>
            <RowItemRight xs={4} md={4}>{selected[0].name}</RowItemRight>
          </RowItem> : '';
      });
    }
    return [];
  }

  render() {
    console.log(this.checkLoading());
    return (<div>
      <Container
        header={this.getHeader()}
        footer={this.getFooter()}
      >
        <ClipLoader color={color.main} loading={this.checkLoading()} />
        {this.getRowItems()}
      </Container>
    </div>);
  }
};

const mapStateToProps = ({ vehicle, coverage }) => ({
  vehicle: vehicle.data,
  loaded_vehicle: vehicle.loaded,
  loading_vehicle: vehicle.loading,

  coverage: coverage.data,
  loaded_coverage: coverage.loaded,
  loading_coverage: coverage.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadVehicle,
      loadCoverage,
      goToEdit: () => push('/edit')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);



