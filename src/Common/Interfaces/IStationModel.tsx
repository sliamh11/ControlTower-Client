import { StationStatus } from '..';
import {StationType} from '../Enums/StationType';
import { IFlightModel } from './IFlightModel';

export interface IStationModel {
    id: string;
    number: number;
    nextStation: number;
    currentFlight : IFlightModel
    types: StationType[];
    status: StationStatus;
    standByPeriod: number;
}