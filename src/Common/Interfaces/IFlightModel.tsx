import { FlightType } from "..";

export interface IFlightModel {
    id: string;
    departureTime: Date;
    landingTime: Date;
    type: FlightType;
}