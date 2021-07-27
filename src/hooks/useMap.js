import { useEffect, useState } from "react";

const useMap = (mapContainer) => {
  const [map, setMap] = useState();

  useEffect(() => {
    const authenticator = window.opalSdk.MapAuthenticator.fromUrl(
      "https://map.nmaps.pl/banchlovers.FnSJD1/NvoMswXWM"
    );
    const options = {
      container: mapContainer
    };

    function onCreate(mapInstance) {
      setMap(mapInstance);
    }

    const promise = window.opalSdk
      .createMap(authenticator, options)
      .then(onCreate)
      .catch((e) => console.error("Oups", e));

    return () => promise.then((map) => map && window.opalSdk.destroyMap(map));
  }, [mapContainer]);

  return map;
};

export default useMap;
