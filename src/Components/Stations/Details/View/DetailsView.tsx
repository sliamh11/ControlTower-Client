import "./DetailsView.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FlightType, IFlightModel } from "../../../../Common";
import { DetailsTable } from "../../..";

// This component manages the station details view.
const DetailsView = (props: any) => {
    const stations = useSelector((state: any) => state.stations);
    const flightsDict: Map<string, IFlightModel> = props.data;

    const [landFlights, setLandFlights] = useState<IFlightModel[]>([]);
    const [depFlights, setDepFlights] = useState<IFlightModel[]>([]);

    useEffect(() => {
        fillFlightLists();
    },[stations]);

    const fillFlightLists = () => {
        const landList: IFlightModel[] = [];
        const depList: IFlightModel[] = [];

        flightsDict.forEach((flight,key) => {
            flight.type === FlightType.Landing
                ? landList.push(flight)
                : depList.push(flight);
        });
        setLandFlights(landList);
        setDepFlights(depList);
    }

    return (
        <div className="details-view-container">
            <DetailsTable data={landFlights}/>
            <DetailsTable data={depFlights}/>
        </div>
    )
}

export default DetailsView;