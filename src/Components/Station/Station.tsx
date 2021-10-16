import "./Station.css";
import { IStationModel } from "../../Common";
import { Flight } from "..";

const Station = (props: any) => {
    const data: IStationModel = props.data;
    
    return (
        <div className={`Station center invisible-window`}>
            <div className="title">Station {data.number+1}</div>
            <Flight stationNumber={data.number} data={data.currentFlight} />
        </div>
    )
}

export default Station;