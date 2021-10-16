import "./DetailsTable.css";
import { TableHead, TableRow, TableBody, Paper, TableContainer, TableCell, Table } from "@mui/material";
import { FlightType, IFlightModel } from "../../../../Common";

const DetailsTable = (props: any) => {

    const flights: IFlightModel[] = props.data;
    const rows: Object[] = [];

    const createRow = (data: any) => {
        if (!data)
            return null;
        return (
            <TableRow>
                {Object.values(data).map((value, index) => {
                    return (
                        <TableCell key={index} align="left">{value}</TableCell>
                    )
                })}
            </TableRow>
        )
    }

    // setTableBody
    const setTableBody = () => {
        flights.forEach((flight) => {
            rows.push(flightConverter(flight));
        });

        return (
            <TableBody>
                {rows.map((row) => {
                    return createRow(row);
                })}
            </TableBody>
        )
    }

    const flightConverter = (flight: IFlightModel) => {
        if (flight) {
            const id = flight.id.slice(0, 5);
            const depTime = flight.departureTime?.toLocaleString();
            const landTime = flight.landingTime?.toLocaleString();
            return { id, depTime, landTime };
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            {flights[0]?.type === FlightType.Landing
                                ? "Landing Flights"
                                : "Departing Flights"}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Departure Time</TableCell>
                        <TableCell align="left">Landing Time</TableCell>
                    </TableRow>
                </TableHead>
                {setTableBody()}
            </Table>
        </TableContainer>
    )
}

export default DetailsTable;