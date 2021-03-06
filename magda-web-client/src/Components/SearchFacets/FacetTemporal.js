import './FacetTemporal.css';
import React, { Component } from 'react';
import FacetHeader from './FacetHeader';
import defined from '../../helpers/defined';
import Button from 'muicss/lib/react/button';
import MonthPicker from '../../UI/MonthPicker';
import range from "../../assets/range.svg";

// the date range facet facet, extends facet component
class FacetTemporal extends Component {
  constructor(props) {
    super(props);
    this.onClearDates = this.onClearDates.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.selectStartYear = this.selectStartYear.bind(this);
    this.selectEndYear = this.selectEndYear.bind(this);
    this.selectStartMonth = this.selectStartMonth.bind(this);
    this.selectEndMonth = this.selectEndMonth.bind(this);
    this.toggleDisableApplyButton = this.toggleDisableApplyButton.bind(this);
    this.state = {
      startYear: undefined,
      startMonth: undefined,
      endYear: undefined,
      endMonth: undefined,
      applyButtonDisabled: true
    }
  }

  componentWillReceiveProps(nextProps){
    const dateFrom = defined(this.props.activeDates[0]) ? new Date(this.props.activeDates[0]) : new Date('1994-05-17');
    const dateTo = defined(this.props.activeDates[1]) ? new Date(this.props.activeDates[1]) : new Date('2018-03-17');

    this.setState({
      startYear: dateFrom.getUTCFullYear(),
      startMonth: dateFrom.getUTCMonth(),
      endYear: dateTo.getUTCFullYear(),
      endMonth: dateTo.getUTCMonth(),
      applyButtonDisabled: !this.props.hasQuery
    })
  }

  onClearDates(){
    let datesArray = [undefined, undefined]
    this.props.onToggleOption(datesArray);
  }

  onApplyFilter(){
    // the month we get are 0 index, to convert to date string, we need to offset by 1
    const dateFrom = new Date(this.state.startYear, this.state.startMonth + 1);
    const dateTo = new Date(this.state.endYear, this.state.endMonth + 1);
    this.props.onToggleOption([dateFrom.toISOString(), dateTo.toISOString()]);
  }

  selectStartYear(startYear){
    this.setState({
      startYear
    });
    this.toggleDisableApplyButton(false);
  }

  selectEndYear(endYear){
    this.setState({
      endYear
    });
    this.toggleDisableApplyButton(false);
  }

  selectStartMonth(startMonth){
    this.setState({
      startMonth
    });
    this.toggleDisableApplyButton(false);
  }

  selectEndMonth(endMonth){
    this.setState({
      endMonth
    });
    this.toggleDisableApplyButton(false);
  }

  toggleDisableApplyButton(disabled){
    this.setState({
      applyButtonDisabled: disabled
    })
  }

  renderDatePicker(){
    return (<div className='facet-temporal-month-picker'>
              <MonthPicker onInvalidInput = {this.toggleDisableApplyButton} showingDefault = {!this.props.hasQuery} year={this.state.startYear} month={this.state.startMonth} yearLower={1994} yearUpper={this.state.endYear} monthLower = {4} monthUpper = {this.state.endMonth} selectYear={this.selectStartYear} selectMonth={this.selectStartMonth}/>
              <div className='facet-temporal-range-icon'><img src = {range} alt='date range'/></div>
              <MonthPicker onInvalidInput = {this.toggleDisableApplyButton} showingDefault = {!this.props.hasQuery} year={this.state.endYear} month={this.state.endMonth} yearLower={this.state.startYear} yearUpper={2018} monthLower = {this.state.startMonth} monthUpper = {2} selectYear={this.selectEndYear} selectMonth={this.selectEndMonth}/>
            </div>)
  }


  render(){
    return <div className='facet-wrapper'>
            <FacetHeader onResetFacet={this.props.onResetFacet}
                     title={this.props.title}
                     id={this.props.id}
                     activeOptions={this.props.activeDates}
                     hasQuery={this.props.hasQuery}
                     onClick={this.props.toggleFacet}/>
             {this.props.isOpen &&
             <div className='clearfix facet-temporal facet-body'>
              {this.renderDatePicker()}
              <div className='facet-footer'>
                  <Button variant="flat" onClick={this.props.onResetFacet}> Clear </Button>
                  <Button disabled={this.state.applyButtonDisabled} variant="flat" onClick={this.onApplyFilter}> Apply </Button>
              </div>
             </div>
           }
           </div>
  }
}

export default FacetTemporal;
