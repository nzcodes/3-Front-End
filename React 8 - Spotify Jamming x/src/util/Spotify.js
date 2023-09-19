import { clientId, redirectUri } from "./SpotifyAccess";

// contents of './SpotifyAccess'
// export const clientId = ${Obtain from Spotify Dev Dashboard}
// export const redirectUri = ${Obtain from Spotify Dev Dashboard}

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async getUserId() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    let response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: headers,
    });
    let jsonResponse = await response.json();
    console.log("gotten user ID");
    let userId = jsonResponse.id;
    console.log(`User ID is ${userId}`);
    return userId;
  },

  async getUserPlaylists() {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await Spotify.getUserId();

    let response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
      }
    );
    let jsonResponse = await response.json();
    if (!jsonResponse.items) {
      console.log("failed - no playlists");
      return [];
    } else {
      console.log("successfully gotten playlists");
      let userPlaylists = await jsonResponse.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        uri: playlist.uri,
      }));
      return userPlaylists;
    }
  },

  async getPlaylistItems(playlistId) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: headers,
      }
    );
    let jsonResponse = await response.json();
    if (!jsonResponse.items) {
      console.log("failed - no playlist items");
      return [];
    } else {
      console.log("successfully gotten playlist items");
      // console.log(jsonResponse.items);
      let playlistItems = await jsonResponse.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
      }));
      return playlistItems;
    }
  },

  async search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    console.log(`searching with "${searchTerm}"`);
    let response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    let jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      console.log("failed - no tracks");
      return [];
    } else {
      console.log("successful search");
      let results = await jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
      return results;
    }
  },

  async savePlaylist(playlistName, tracks, playlistId) {
    if (!playlistName || !tracks.length) {
      return;
    } else if (playlistName && tracks.length && !playlistId) {
      return Spotify.newPlaylist(playlistName, tracks);
    } else if (playlistName && tracks.length && playlistId) {
      Spotify.renamePlaylist(playlistName, playlistId);
      Spotify.updatePlaylist(tracks, playlistId);
    }
  },

  async newPlaylist(playlistName, tracks) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const userId = await Spotify.getUserId();

    // create playlist
    let playlistPost = {
      name: playlistName,
    };
    let post = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify(playlistPost),
      }
    );
    let newPlaylist = await post.json();
    console.log(`creating new playlist: ${newPlaylist.name}`);

    // parse playlist ID from response
    let playlistId = await newPlaylist.id;

    // submit playlist
    let submit = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify(tracks),
      }
    );
    console.log(tracks);
    console.log(`tracks added to ${newPlaylist.name}`);
    return submit;
  },

  async renamePlaylist(playlistName, playlistId) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    // rename playlist
    let newName = {
      name: playlistName,
    };
    let rename = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: headers,
        method: "PUT",
        body: JSON.stringify(newName),
      }
    );
    // console.log(rename);
    // let renamedPlaylist = await rename.json();
    console.log(`changed playlist name: ${playlistName}`);
    return rename;
  },

  async updatePlaylist(tracks, playlistId) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const body = { uris: tracks };

    // console.log(JSON.stringify(body));

    // update playlist
    let update = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    console.log(`updated playlist tracks: ${playlistId}`);
    return update;
  },
};

export default Spotify;
