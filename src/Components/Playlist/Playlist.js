import React from "react";
import './Playlist.css'
import TrackList from "../TrackList/TrackList"
import Loading from "../loading/loading"

 class  Playlist extends React.Component {
  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }
  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }
    render(){
      if(this.props.isLoading){
        return <Loading/>
      }
        return(<div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'New Playlist'}/>
        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        
        <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>)
    }
}
export default Playlist