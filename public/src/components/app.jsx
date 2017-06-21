import React from 'react';
import Calendar from './calendar.jsx';
import TempDropdown from './tempDropdown.jsx';
import MapView from './mapView.jsx';
import moment from 'moment';
import axios from 'axios';
import DestinationsList from './resultBoxes.jsx';
import Results from './results.jsx';
import Search from './search.jsx';
import SearchHistory from './userSearchHistory.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      temp: 'warm',
      results: [],
      sentSearch: false
    }
    console.log(moment());
    console.log('startDate is: ', this.state.startDate);
    this.changeTemp = this.changeTemp.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  changeTemp(e) {
    this.setState({
      temp: e.target.value
    })
  }

  changeDate(date){
    this.setState({
      startDate: date
    })
    console.log('startDate is: ', this.state.startDate);
  }

  getCityResults(e){
    e.preventDefault();
    axios.post('/api/search', {
      startDate: this.state.startDate,
      temp: this.state.temp
    })
      .then((res) => {
        this.setState({
          sentSearch: true,
          results: res.data
        })
        console.log('Data received: ', JSON.stringify(res.data));
        return res.data
      }).catch((err) => {
        throw err;
      })
  }

  showResultsPage() {
    this.setState({'sentSearch': !this.state.sentSearch});
  }

  render() {
    var Page = null;
    if ( !this.state.sentSearch ) {
      Page = <Search getCityResults={this.getCityResults.bind(this)} startDate={this.state.startDate} changeDate={this.changeDate} changeTemp={this.changeTemp.bind(this)} temp={this.state.temp}/>;
    } else if ( this.state.sentSearch ) {
      Page = <Results results={this.state.results}/>;
    }

    return (
      <div>
        <span className="navSpan">
          <a href="/auth/google">Sign In With Google</a>
          <a href="/api/history">History Page</a>
          <button onClick={this.showResultsPage.bind(this)}>DEBUG: Toggle Results Page</button>
        </span>
        {Page}
      </div>
    )
  }
}

module.exports = App;
