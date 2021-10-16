const api_url: string = "http://localhost:61270/api";

const stationsReducer = (state: any = null, action: any): any => {
    if (action && action.payload !== null) {
        state = action.payload;
    }
    return state ? state : null;
}

const apiReducer = (): any => {
    return {
        api: api_url,
        hub: `${api_url}/tower-hub`,
        tower: `${api_url}/tower`,
        stations: `${api_url}/tower/state`
    }
}

const rootReducer = {
    stations: stationsReducer,
    apiUrls: apiReducer
};

export default rootReducer;
