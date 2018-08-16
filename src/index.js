import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSEARCH from 'youtube-api-search';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
import _ from 'lodash';

const API_KEY = "AIzaSyD82Fz_522Z080wicBiRfHSW6ivZrI_UvI";

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      videos: [],
      selectedVideo:null
     };

    this.videoSearch('Java');
  }

  videoSearch(term)
  {
     YTSEARCH({ key: API_KEY, term:term }, (videos) => {
      this.setState({ videos,
        selectedVideo:videos[0]
     });
    });
   
  }

  render() {
    
    const videoSearch= _.debounce(term=>{this.videoSearch(term)},300);

    return (
      
      <div>
        <SearchBar onSearchStringChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
        onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
         videos={this.state.videos}
          />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.querySelector('.container'));