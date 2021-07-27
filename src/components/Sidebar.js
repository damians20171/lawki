import styles from "./Sidebar.module.css";
import './Sidebar.css'

const Sidebar = ({ selectedPlace, sidebarIsOpen, closeSidebar }) => {
  return (
    <div
      className={
        sidebarIsOpen ? `${styles.sidebar} ${styles.active}` : styles.sidebar
      }
    >
      <button className={styles.btn} onClick={closeSidebar}>
        X
      </button>

      <div className="sidebar-inner">
        <ul>
          <li><h3>{selectedPlace.Name}</h3></li>
          <li className="sidebar-image">
            <img src={`${process.env.PUBLIC_URL}/upload/lawka-numer-${selectedPlace.Id}.jpg`} />
          </li>
          <li>Typ: <span>{selectedPlace.Type}</span></li>
          <li>Numer: <span>{selectedPlace.Id}</span></li>
        </ul>
      </div>


    </div>
  );
};

export default Sidebar;
