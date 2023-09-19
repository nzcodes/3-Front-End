import React from "react";
import "./UserPlaylist.css";

class UserPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  loadPlaylist() {
    this.props.onLoad(this.props.playlist)
  }

  render() {
    const playlistName = this.props.playlist.name;

    return (
      <div className="UserPlaylist">
        <div className="UserPlaylist-information">
          <h3>{playlistName}</h3>
        </div>
        <button className="UserPlaylist-action" onClick={this.loadPlaylist}>&lt;</button>
      </div>
    );
  }
}

export default UserPlaylist;
