import React from "react";
import "./UserPlaylists.css";
import PlaylistList from "../PlaylistList/PlaylistList";

class UserPlaylists extends React.Component {
  render() {
    return (
      <div className="UserPlaylists">
        <h2>User Playlists</h2>
        <PlaylistList
          playlists={this.props.userPlaylists}
          onLoad={this.props.onLoad}
        />
        <button className="Spotify-connect" onClick={this.props.onConnect}>
          CONNECT SPOTIFY
        </button>
      </div>
    );
  }
}

export default UserPlaylists;
