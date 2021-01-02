import React from "react";
import styled from "styled-components";

import { UserPlaylists } from "react-spotify-api";
import { useHistory } from "react-router-dom";

const PlaylistItem = styled.div`
  margin: 5px 0;
  font-size: 16px;
  cursor: pointer;
`;

function Playlists() {
  let history = useHistory();

  return (
    <div>
      <UserPlaylists>
        {(playlists, loading, error) => (
          <div>
            {console.log(playlists)}
            {playlists && playlists.data !== null ? (
              <div>
                {playlists &&
                  playlists.data.items.map((p) => (
                    <PlaylistItem
                      onClick={() => history.push("/playlist/" + p.id)}
                    >
                      {p.name}
                    </PlaylistItem>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </UserPlaylists>
    </div>
  );
}

export default Playlists;
