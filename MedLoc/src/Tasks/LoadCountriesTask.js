import { features } from "../data/dummydata.json";
let tempdata;

fetch(
        'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
    )
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        tempdata = data;
    })
    .then(() => console.log(tempdata));

class LoadCountriesTask {
    load = (setState) => {
        setState(tempdata);
    };
}

export default LoadCountriesTask;