import React from "react";
import styled from "styled-components";
import { useStoreActions, useStoreState } from "easy-peasy";

const TrackContainer = styled.div`
  cursor: pointer;
  width: 200px;
  overflow-x: hidden;
  margin-right: 10px;
  margin-bottom: 30px;
`;

const ArtworkContainer = styled.div`
  width: 200px;
  height: 200px;
`;

const Artwork = styled.img`
  width: 100%;
  height: 100%;
`;

const Metadata = styled.div``;
const Title = styled.div``;
const Artist = styled.div``;

function Track({ data, playTrack }) {
  const setTrackName = useStoreActions((action) => action.player.setTrackName);
  const setTrackArtist = useStoreActions(
    (action) => action.player.setTrackArtist
  );
  const setAlbumArtwork = useStoreActions(
    (action) => action.player.setAlbumArtwork
  );
  const setPlayerVisible = useStoreActions(
    (action) => action.player.setVisible
  );

  function handleClick() {
    const artists = data.track.artists.map((artist) => artist.name).join(", ");
    console.log(artists);
    setTrackName(data.track.name);
    setTrackArtist(artists);
    setAlbumArtwork(data.track.album.images[0].url);
    setPlayerVisible(true);
    playTrack(data.track.uri);
  }

  console.log(data);
  return (
    <TrackContainer onClick={() => handleClick()}>
      <ArtworkContainer>
        <Artwork src={data.track.album.images[0].url} alt={"Artwork"} />
      </ArtworkContainer>
      <Metadata>
        <Title>{data.track.name}</Title>
        <Artist>
          {data.track.artists.map((artist) => (
            <span>{artist.name}</span>
          ))}
        </Artist>
      </Metadata>
    </TrackContainer>
  );
}

export default Track;
