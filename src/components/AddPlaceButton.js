import styles from './AddPlaceButton.module.css';

const AddPlaceButton = (props) => {
    return (
        <div>
            <button className={styles.addPlaceButton} onClick={props.openAddPlaceWindow}>+</button>
        </div>
    );
}

export default AddPlaceButton;