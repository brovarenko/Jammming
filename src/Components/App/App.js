import React from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchResults:[],
      playlistTracks:[],
      playlistName: "My Playlist",
      isLoading: false

    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlayList = this.savePlayList.bind(this)
    this.search = this.search.bind(this)
  }
 
    savePlayList(){
      const trackUris = this.state.playlistTracks.map(track=>track.uri)
      this.setState({isLoading: true})
      
      console.log(this.state.isLoading)
      Spotify.savePlayList(this.state.playlistName, trackUris).then(()=>{
        
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks:[],
          isLoading:false
        })
      })
    }
  
  addTrack(track){
    let tracks = this.state.playlistTracks
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } 
      tracks.push(track)
      this.setState({ playlistTracks: tracks})
    
  }
  removeTrack(track){
    let newTrack = this.state.playlistTracks
    newTrack = newTrack.filter(t => t.id !== track.id)
      this.setState({ playlistTracks: newTrack})
    
  }
  updatePlaylistName(name){
    this.setState({playlistName:name})
  }
  
  
  
  search(term){
     Spotify.search(term).then(searchResults =>{
       
       //searchResults = searchResults.filter(e=>this.state.playlistTracks.every(el=>el.id!==e.id))
       this.setState({searchResults: searchResults})
     })
  }
render(){
  return (<div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
    <SearchBar onSearch={this.search}/>   
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults.filter(e=>this.state.playlistTracks.every(el=>el.id!==e.id))} 
        onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} 
          playlistTracks ={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlayList}
          isLoading={this.state.isLoading}
        />
      </div>
    </div>
  </div>)
}
}

export default App;
