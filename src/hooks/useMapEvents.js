import { useEffect, useState, useCallback } from "react";
import { empty } from "rxjs";
import { filter as rxFilter } from "rxjs/operators";

const useMapEvents = (stream = empty(), callback = () => {}) => {
  useEffect(() => {
    const subscription = stream.subscribe(callback);

    return () => subscription.unsubscribe();
  }, [stream, callback]);
};

const useMapClick = (map, callback = () => {}) => {
  const [source, setSource] = useState(empty());

  useEffect(() => {
    const source$ = (map && map.event$) ?? empty();
    const click$ = source$.pipe(rxFilter(({ type }) => "click" === type));
    setSource(click$);
  }, [map]);

  useMapEvents(source, callback);
};

const useMapHover = (map, callback = () => {}) => {
  const [source, setSource] = useState(empty());

  useEffect(() => {
    const source$ = (map && map.event$) ?? empty();
    const hover$ = source$.pipe(rxFilter(({ type }) => "mousemove" === type));
    setSource(hover$);
  }, [map]);

  useMapEvents(source, callback);
};

export default useMapEvents;

export { useMapClick, useMapHover };
