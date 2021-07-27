import { useEffect, useState, useCallback } from "react";
import useMap from "../hooks/useMap";
import { filter as rxFilter } from "rxjs/operators";
import { useMapClick, useMapHover } from "../hooks/useMapEvents";

const Map = ({ data, onPlaceClick, openSidebar, setNewPlaceClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Tworzę dataset
  const [dataset, setDataset] = useState(
    window.opalSdk.createDataset("places", { data: data })
  );

  const map = useMap("map");

  useEffect(() => {
    if (!map) return;

    const subscription = map.event$
      .pipe(rxFilter(({ type }) => "load" === type))
      .subscribe(() => setIsLoaded(true));

    return () => {
      setIsLoaded(false);
      subscription.unsubscribe();
    };
  }, [map]);

  useEffect(() => {
    if (!dataset) return;

    dataset.setData(data);
  }, [dataset, data]);

  const addData = useCallback(() => {
    if (!(map || dataset)) return;

    // Dodaję warstwę punktową
    map.addData(dataset, {
      id: "places",
      type: "circle",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 0, 5, 13, 6],
        "circle-color": "#fba42f"
      }
    });
  }, [map, dataset]);

  useEffect(() => {
    if (!isLoaded) return;
    addData();
  }, [addData, isLoaded]);

  const onMapClickHandler = async (e) => {
    // Z tych warstw zbieram dane po kliknięciu w mapę
    const layers = ["places"];

    const { x, y } = e.data.point;

    // Tworzę "bufor" żeby kliknięcie w punkt było rejestrowane z większego obszaru (niepotrzebna snajperska celność. Do współrzędnych punktu odpowiednio dodaję i odejmuję po 5px. Tymi wartościami można śmiało manewrować)
    const iconCoords = [
      [x - 5, y - 5],
      [x + 5, y + 5]
    ];

    const target = map.query(iconCoords, { layers });

    // Dane pobrane po kliknięciu w punkt
    console.log(target);
    if (target.length > 0) {
      onPlaceClick(target[0].properties);
      openSidebar();
    }

    // Współrzędne klikniętego miejsca na mapie. Potrzebne gdy tworzymy nowy obiekt
    //console.log(e.data.lngLat);

    setNewPlaceClick(prevValue => e.data.lngLat)

  };

  const onObjectHover = async (e) => {
    const layers = ["places"];

    const { x, y } = e.data.point;
    const iconCoords = [x + 5, y + 5, x - 5, y - 5];
    const target = map.query(iconCoords, { layers });

    if (target.length > 0) {
      map.canvas.style.cursor = "pointer";
    } else if (target.length === 0) {
      map.canvas.style.cursor = "default";
    }
  };

  useMapClick(map, onMapClickHandler);
  useMapHover(map, onObjectHover);

  return <div id="map" />;
};

export default Map;
