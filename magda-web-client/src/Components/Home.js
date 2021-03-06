import React from 'react';
import Statistics from '../Components/Statistics';
import News from '../UI/News';
import {config} from '../config';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchFeaturedDatasetsFromRegistry} from '../actions/featuredDatasetsActions';
import {fetchDatasetCount} from '../actions/statsActions';
import {fetchNewsfromRss} from '../actions/newsActions';
import DatasetSummary from '../Components/Dataset/DatasetSummary';
import ReactDocumentTitle from 'react-document-title';
import './Home.css';

class Home extends React.Component {
  componentWillMount(){
    this.props.fetchFeaturedDatasets(config.featuredDatasets);
    this.props.fetchNewsfromRss();
    this.props.fetchDatasetCount();
  }
  render() {
    return (
      <ReactDocumentTitle title={'Welcome | ' + config.appName}>
      <div className='container home'>
        <div className='mui-row'>
          <div className='mui-col-sm-8'>
            <h2>About</h2>
              <div className='about' dangerouslySetInnerHTML={{__html: config.about}}/>
            <h2>Featured datasets</h2>
            <div className='white-box'>
              {this.props.datasets.map((d, i )=><DatasetSummary key={d.identifier || i} dataset={d}/>)}
            </div>

          </div>
          <div className='mui-col-sm-4'>
            <Statistics stats={this.props.stats}/>
            <div className='latest-news'>
              <h2>LATEST NEWS</h2>
              <News isFetching={this.props.isNewsFetching} error={this.props.newsFetchingError} newsItems={this.props.newsItems}/>
            </div>
          </div>
        </div>
      </div>
      </ReactDocumentTitle>
    );
  }
}

const mapStateToProps=(state)=> {
  const datasets=state.featuredDatasets.records;
  const isFetching=state.featuredDatasets.isFetching;
  const error=state.featuredDatasets.error;
  const isNewsFetching=state.news.isFetching;
  const newsItems=state.news.news;
  const newsFetchingError=state.news.error;
  const stats=state.stats;
  return {datasets, isFetching, error, isNewsFetching, newsItems, newsFetchingError, stats}
}

const mapDispatchToProps=(dispatch)=> {
  return bindActionCreators({
    fetchFeaturedDatasets: fetchFeaturedDatasetsFromRegistry,
    fetchNewsfromRss: fetchNewsfromRss,
    fetchDatasetCount: fetchDatasetCount
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
