import "./Flight.css";
import { faPlaneDeparture, faPlaneArrival } from "@fortawesome/free-solid-svg-icons"
import { IFlightModel, FlightType } from "../../Common";
import { Icon } from "../../UIKit";

const Flight = (props: any) => {
    const data: IFlightModel = props.data;
    const stationNumber: number = props.stationNumber;

    const loadFlight = () => {
        if (data) {
            const flipped = stationNumber <= 3 ? "flip-horizontal" : "";
            const floating = stationNumber <= 2 ? "floating" : "";
            return data.type === FlightType.Landing
                ? <LandingFlight className={`${flipped} ${floating}`} data={data} />
                : <DepartureFlight className={`${flipped} ${floating}`} data={data} />
        }
    }

    return (
        <div className="flight">
            {loadFlight()}
            <div className="id-tag">
                {data?.id.slice(0, 5)}
            </div>
        </div>
    )
}

const LandingFlight = (props: any) => {
    const data: IFlightModel = props.data;
    const classes: string = props.className;
    return (
        <div className={`${classes} landing`}>
            <Icon i={faPlaneArrival} />
        </div>
    )
}

const DepartureFlight = (props: any) => {
    const data: IFlightModel = props.data;
    const classes: string = props.className;
    return (
        <div className={`${classes} departure`}>
            <Icon i={faPlaneDeparture} />
        </div>
    )
}

export default Flight;