import { useState, useEffect } from "react";
import Map from "./components/Map";
import { places } from "./data/places";
import Sidebar from "./components/Sidebar";
import AddPlaceButton from "./components/AddPlaceButton";
import AddPlaceWindow from "./components/AddPlaceWindow";

import './styles.css'

export default function App() {
  const [data, setData] = useState();
  const [selectedPlace, setSelectedPlace] = useState({});
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({});
  const [addPlaceWindowIsOpen, setAddPlaceWindowIsOpen] = useState(false);
  const [newPlaceClick, setNewPlaceClick] = useState({});
  const [newBenchName, setNewBenchName] = useState();
  const [newBenchType, setNewBenchType] = useState();
  const [benchCounter, setBenchCounter] = useState(2);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onPlaceClick = (place) => {
    setSelectedPlace(place);
  };

  // const addPlace = () => {
  //   console.log(places)

  // };


  const addPlace = (place) => {
    //const index = Math.floor(Math.random() * 15);
    places.push({
      type: "Feature",
      properties: {
        Name: "Inna ławka",
        Type: "ławka",
        Id: 1
      },
      geometry: {
        type: "Point",
        coordinates: [`${index}` + .35791015625, `${index}` + .13110763758015]
      }
    });
    const newPlaces = {
      type: "FeatureCollection",
      features: places
    }
    setData(newPlaces);
  }






  const openSidebar = () => setSidebarIsOpen(true);

  const closeSidebar = () => setSidebarIsOpen(false);

  const openAddPlaceWindow = () => setAddPlaceWindowIsOpen(true)




  useEffect(() => {
    // W tym miejscu łączę wszystkie miejsca w plik geojson potrzebny do mapy. Strukturę geojsona możesz sprawdzić np. na http://geojson.io/

    const geojson = {
      type: "FeatureCollection",
      features: places
    };
    // console.log(places, 'xd')
    setData(geojson);
  }, []);


  return (
    <div>
      <Map data={data} onPlaceClick={onPlaceClick} openSidebar={openSidebar} setNewPlaceClick={setNewPlaceClick} />
      <Sidebar
        selectedPlace={selectedPlace}
        sidebarIsOpen={sidebarIsOpen}
        closeSidebar={closeSidebar}
      />
      <AddPlaceButton openAddPlaceWindow={openAddPlaceWindow} />
      <AddPlaceWindow
        addPlaceWindowIsOpen={addPlaceWindowIsOpen}
        setAddPlaceWindowIsOpen={setAddPlaceWindowIsOpen}
        newPlaceCoordinates={newPlaceClick}
        setNewBenchName={setNewBenchName}
        setNewBenchType={setNewBenchType}
        setBenchCounter={setBenchCounter}
        newBenchName={newBenchName}
        newBenchType={newBenchType}
        benchCounter={benchCounter}
        setData={setData}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />
    </div>
  );
}
