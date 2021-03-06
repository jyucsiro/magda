import React, { Component } from 'react';
import DataPreviewTable from '../UI/DataPreviewTable';
import DataPreviewTextBox from '../UI/DataPreviewTextBox';
import DataPreviewGoogleViewer from '../UI/DataPreviewGoogleViewer';
import DataPreviewJson from '../UI/DataPreviewJson';
import DataPreviewVega from '../UI/DataPreviewVega';
import type {PreviewData} from '../helpers/previewData';
import {fetchPreviewData} from '../actions/previewDataActions'

import ProgressBar from "../UI/ProgressBar";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import News from '../UI/News';


class DataPreviewer extends Component {
    props: {
      data: PreviewData,
      fileName: string
    }

    componentWillMount(){
      this.props.fetchPreviewData(this.props.distribution);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.distribution.downloadURL && nextProps.distribution.downloadURL !== this.props.distribution.downloadURL){
          this.props.fetchPreviewData(this.props.distribution);
        }
    }

    visualisable(){
      return !this.props.isFetching && !this.props.error && this.props.data;
    }

    renderByState(previewData){
        switch (previewData.meta.type) {
          case 'geo':
            return <iframe title='national map' name='FRAME1' src={previewData.data} width='100%' height='600px' scrolling='auto' frameBorder='0'/>
          case 'chart':
            return <DataPreviewVega data={previewData}></DataPreviewVega>
          case 'tabular':
            return <DataPreviewTable data={previewData}/>
          case 'json':
            return <DataPreviewJson data={previewData}/>
          case 'txt':
            return <DataPreviewTextBox data ={previewData}/>
          case 'html':
            return <iframe title='preview' width="100%" height="600px" src={previewData}></iframe>
          case 'rss' :
           return <News newsItems={previewData}/>
          case 'googleViewable':
            return <DataPreviewGoogleViewer data={previewData}/>
          case 'impossible':
            return "this dataset cannot be previewed"
          default:
            return null;
        }
    }

    render(){
      const url = this.props.url;
      return <div className='data-previewer'>
              <h3 className='section-heading'><a href={url} target='_blank'>{url && url.substring(url.lastIndexOf('/')+1)}</a></h3>
              {this.props.error && <div>{this.props.error}</div>}
              {this.props.isFetching && <ProgressBar/>}
              {this.props.data && this.props.distribution.identifier && this.props.data[this.props.distribution.identifier] && this.renderByState(this.props.data[this.props.distribution.identifier])}
             </div>
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

const  mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPreviewData: fetchPreviewData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPreviewer);
