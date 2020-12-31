import React from "react";
import { UserPlaylists } from "react-spotify-api";
import { useHistory } from "react-router-dom";

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
                    <div onClick={() => history.push("/playlist/" + p.id)}>
                      {console.log(p)}
                      {p.name}
                    </div>
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
