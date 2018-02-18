import 'es6-symbol/implement';
import React, { Component } from 'react';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';
import ChartConfig from './ChartConfig';
import defined from '../helpers/defined';
import fetch from 'isomorphic-fetch';
import {fetchPreviewData} from '../actions/previewDataActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VegaLite from 'react-vega-lite';

const VEGAMARK = ['area', 'bar', 'circle', 'line', 'point', 'rect', 'square', 'text', 'tick'];
const DATATYPE = ['quantitative', 'temporal', 'ordinal', 'nominal'];

class DataPreviewChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'line',
      chartTitle: '',
      Yaxis: '',
      xAxis: '',
      xScale: 'temporal',
      yScale: 'quantitative'
    }
  }

  componentWillMount(){
    if(this.props.distribution){
      this.props.fetchPreviewData(this.props.distribution);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.distribution.identifier !== this.props.distribution.identifier){
        this.props.fetchPreviewData(nextProps.distribution);
      }
  }

  onChange(i, value, tab, ev) {
    console.log(arguments);
  }

  onActive(tab) {
    console.log(arguments);
  }

  renderChart(){
    const previewData = this.props.data[this.props.distribution.identifier];
    if(defined(previewData)){
      const spec = {
        "height": 200,
        "description": this.state.title,
        "mark": this.state.chartType,
        "encoding": {
          "x": {"field": previewData.meta.chartFields.time[0], "type": this.state.xScale},
          "y": {"field": previewData.meta.chartFields.numeric[0], "type": this.state.yScale}
        }
      }

      const data ={
        values: previewData.data
      }

      return (<div className='mui-row'>
                <div className='mui-col-sm-6'><VegaLite spec={spec} data={data}/></div>
                <div className='mui-col-sm-6'><ChartConfig chartType={this.state.chartType}
                                                           chartTitle={this.state.chartTitle}
                                                           xScale={this.state.xScale}
                                                           yScale={this.state.yScale}/></div>
              </div>)
    }
    return <div>no chart here</div>

  }

  renderTable(){

  }

  render(){
    if(this.props.data){
      return (
        <Tabs onChange={this.onChange} defaultSelectedIndex={0}>
          <Tab value="pane-1" label="Chart" onActive={this.onActive}>{this.renderChart()}</Tab>
          <Tab value="pane-2" label="Table">{this.renderTable()}</Tab>
        </Tabs>
      )
    } else if(this.props.isFetching){
      return <div>Preview is loading</div>
    }else if(this.props.error){
      return <div>Preview errored</div>
    } else {
      return <div>No preview available</div>
    }
  }
}


function mapStateToProps(state) {
  const previewData= state.previewData;
  const data = previewData.previewData;
  const isFetching = previewData.isFetching;
  const error = previewData.error;
  const url = previewData.url;
  return {
    data, isFetching, error, url
  };
}

const  mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators({
    fetchPreviewData: fetchPreviewData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPreviewChart);