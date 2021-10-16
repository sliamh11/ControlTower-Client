import "./StationsView.css";
import { useSelector } from "react-redux";
import { Station } from "../..";
import { IStationModel } from "../../../Common";

// This component manages the station's view.
const StationsView = () => {
    const stationsList: any = useSelector((state: any) => state.stations);

    const loadStations = () => {
        if (stationsList && stationsList.length > 0) {
            return stationsList.map((stations: IStationModel[], index: number) => {
                const station = stations[0]; // Taking the first object of each inner-array.
                return (
                    <div key={station.id} className={`center container station${index}`}>
                        <Station data={station} />
                    </div>
                );
            });
        }
    }

    return (
        <div className="stations-container">
            {loadStations()}
        </div>
    )
}

export default StationsView;