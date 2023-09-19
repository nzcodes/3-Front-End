import React from "react";
import "./PlayList.css";
import TrackList from "../TrackList/TrackList";

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  resetPlaylist() {
    this.props.onReset();
  }

  render() {
    return (
      <div className="Playlist">
        <div className="PlaylistName">
          <input
            value={this.props.playlistName}
            onChange={this.handleNameChange}
          />
          <button className="Playlist-action" onClick={this.resetPlaylist}>
            ^
          </button>
        </div>
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default PlayList;
