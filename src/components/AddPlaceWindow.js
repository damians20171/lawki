import React, { useState } from "react";
import { places } from "../data/places";

import axios from 'axios';

import Map from "./Map";
import { useMapClick, useMapHover } from "../hooks/useMapEvents";
import styles from './AddPlaceWindow.module.css';
import './AddPlaceWindow.css'


const AddPlaceWindow = (props) => {
    const [wasPointSelected, setWasPointSelected] = useState(false);

    const handleGetPosition = () => {
        props.setAddPlaceWindowIsOpen(true);
        console.log(props.newPlaceCoordinates)
        setWasPointSelected(true);
        document.querySelector('#map').removeEventListener('click', handleGetPosition)
    }

    const positionChecker = () => {
        props.setAddPlaceWindowIsOpen(false)
        document.querySelector('#map').addEventListener('click', handleGetPosition)

    }

    const handleNewBenchName = (e) => {
        props.setNewBenchName(e.target.value)
        console.log(props.newBenchName)
    }
    const handleNewBenchType = (e) => {
        props.setNewBenchType(e.target.value)
    }

    const fileImportHandler = (e) => {
        console.log(e.target.files[0]);
        props.setUploadedFile(e.target.files[0])
        console.log(props.uploadedFile);
    }

    const handleSubmit = () => {

        places.push({
            type: "Feature",
            properties: {
                Name: props.newBenchName,
                Type: props.newBenchType,
                Id: props.benchCounter
            },
            geometry: {
                type: "Point",
                coordinates: [props.newPlaceCoordinates.lng, props.newPlaceCoordinates.lat]
            }
        });
        const newPlace = {
            type: "FeatureCollection",
            features: places
        }
        props.setData(newPlace);

        props.setBenchCounter(prevState => prevState + 1)
        console.log('xddddd');

        /* import file */
        const data = new FormData()
        data.append('file', props.uploadedFile)
        // axios.post("http://localhost:3000/public", data)
        axios.post("http://localhost:3000/upload", data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText, 'xd1')
            })
        /* import file */

        console.log('sdsd')
        props.setAddPlaceWindowIsOpen(false)
    }

    // const positionChecker = () => {
    //     props.setAddPlaceWindowIsOpen(false)
    //     document.querySelector('#map').addEventListener('click', () => {
    //         props.setAddPlaceWindowIsOpen(true);
    //         console.log(props.newPlaceCoordinates)
    //     })

    // }

    return (
        <div className={props.addPlaceWindowIsOpen ? `${styles.addPlaceWindowOuter} ${styles.active}` : styles.addPlaceWindowOuter}>
            <div className={`${styles.addPlaceWindowInner}`}>
                <form>
                    <label htmlFor="benchName">Podaj nazwę ławki</label>
                    <input id="benchName" type="text" value={props.newPlaceName} onChange={handleNewBenchName} />

                    <span className="add-place-button" onClick={positionChecker}>{wasPointSelected ? "Kliknij, aby wybrać punkt jeszcze raz" : "Kliknij tutaj, aby wybrać miejsce ławki"}</span>
                    <span className="flex">
                        <span className="benchLng">{wasPointSelected ? `Współrzędna X: ${props.newPlaceCoordinates.lng}` : null}</span>
                        <span className="benchLat">{wasPointSelected ? `Współrzędna Y: ${props.newPlaceCoordinates.lat}` : null}</span>
                    </span>

                    <label htmlFor="benchType">Podaj typ ławki</label>
                    <select id="benchType" value={props.newBenchType} onChange={handleNewBenchType}>
                        <option>Ławka z oparciem</option>
                        <option>Ławka bez oparcia</option>
                        <option>Ławka ze stolikiem</option>
                    </select>

                    <input type="file" name="file" onChange={fileImportHandler} />

                    <span className="add-place-button" onClick={handleSubmit}>Dodaj ławkę</span>
                </form>
            </div>
        </div>
    );
}

export default AddPlaceWindow;