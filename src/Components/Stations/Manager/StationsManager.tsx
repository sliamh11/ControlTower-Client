import "./StationsManager.css";
import { StationsView, DetailsView } from "../../index";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStationsState } from '../../../State/Stations/Actions';
import { IFlightModel, IStationModel, StationType } from "../../../Common";
import { AlertDialog } from "../../../UIKit";
import axios from "axios";

// This component manages everything about the stations.
const StationsManager = () => {
    const dispatch = useDispatch();
    const urls = useSelector((state: any) => state.apiUrls);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [connection, setConnection] = useState<HubConnection>(null);
    const [flightsHistory, setFlightsHistory] = useState(new Map<string, IFlightModel>());

    useEffect(() => {
        // Set connection
        const newConnection: any = new HubConnectionBuilder()
            .withUrl(urls.hub)
            .build();
            
        setConnection(newConnection);
    }, []);

    // Init sockets & data
    useEffect(() => {
        initSockets();
        initStations();
    }, [connection]);

    const initSockets = async () => {
        if (connection) {
            await startConnection();
            // Sockets
            connection.on("StateUpdated", onStateUpdated);
            connection.onclose(onDisconnected);
        }
    }

    const onStateUpdated = (stationsObj: any) => {
        const stations = convertObjToStationsList(stationsObj);
        checkNewFlights(stations);
        dispatch(setStationsState(stations));
    }
    const onDisconnected = async () => {
        setIsConnected(false);
        await startConnection();
    }

    const startConnection = async () => {
        try {
            if (connection.state === HubConnectionState.Disconnected) {
                await connection.start();
                console.log("Connected!");
                setIsConnected(true);
                initStations();
            }
        } catch (error) {
            console.log(error.message);
            setTimeout(startConnection, 5000);
        }
    }

    const initStations = async () => {
        try {
            const { data } = await axios.get<Array<Array<IStationModel>>>(urls.stations);
            const stations = convertObjToStationsList(data);
            checkNewFlights(stations);
            dispatch(setStationsState(stations));
        } catch (error) {
            console.log("Exception: ", error);
        }
    }

    const checkNewFlights = (stationsList: IStationModel[][], isAllStations: boolean = false) => {
        if (stationsList) {
            const history = flightsHistory;
            stationsList.forEach((stations: IStationModel[]) => {
                stations.forEach((station: IStationModel) => {
                    if (!isAllStations
                        || station.types.some((type) => type === StationType.Landing || type === StationType.Departure)) {
                        if (station.currentFlight) {
                            const flightId = station.currentFlight.id;
                            if (!history.has(flightId)) {
                                history.set(flightId, station.currentFlight);
                            }
                        }
                    }
                });
            });
            setFlightsHistory(history);
        }
    }

    const convertObjToStationsList = (objList: Object[]) => {
        return objList.map((obj: {}) => {
            return Object.values<IStationModel>(obj);
        });
    }

    if (!isConnected) {
        return (
            <AlertDialog open={true} />
        )
    } else {
        return (
            <div className="stations-mng-container">
                <StationsView />
                <DetailsView data={flightsHistory} />
            </div>
        )
    }
}

export default StationsManager;