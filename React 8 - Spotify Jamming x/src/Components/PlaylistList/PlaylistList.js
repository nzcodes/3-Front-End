import React from "react";
import "./PlaylistList.css";
import UserPlaylist from "../UserPlaylist/UserPlaylist";

class PlaylistList extends React.Component {
  render() {
    return (
      <div className="PlaylistList">
        {this.props.playlists &&
          this.props.playlists.map((playlist) => {
            return (
              <UserPlaylist
                playlist={playlist}
                key={playlist.id}
                onLoad={this.props.onLoad}
              />
            );
          })}
      </div>
    );
  }
}

export default PlaylistList;
