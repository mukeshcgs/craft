import axios from "axios";
//const URL = "http://mukeshthankar.com/wp49/wp-json/wp/v2/pages";
//const URL = "http://localhost/www/mukeshthankar.com/wordpress/wp-json/wp/v2/pages";
const URL = "https://api.quarantine.country/api/v1/summary/latest"

//GET Pages if added
export const getPages = () => (dispatch) => {
    console.log("getPages Called");
    dispatch({
        type: "FETCH_LATEST"
    });
    return axios.get(URL)
        .then((response) => {
            dispatch({
                type: "FETCH_LATEST_FULFILLED",
                payload: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: "FETCH_LATEST_REJECTED",
                payload: err
            })
        })
}

// "url": "https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise",
// "headers": {
//     "x-rapidapi-host": "coronavirus-tracker-india-covid-19.p.rapidapi.com",
//     "x-rapidapi-key": "7d2d8cdad7msh4d195f980df65dfp1e065bjsn15b1cff29222"
// }
//https://rapidapi.com/189302059.anurag/api/coronavirus-tracker-india-covid-19
const URL_INDIA = "https://coronavirus-tracker-india-covid-19.p.rapidapi.com/api/getStatewise"
const options = {
    headers: {
        'x-rapidapi-host': "coronavirus-tracker-india-covid-19.p.rapidapi.com",
        "x-rapidapi-key": "7d2d8cdad7msh4d195f980df65dfp1e065bjsn15b1cff29222"
    }
}
//GET Single project
export const getIndiaData = () => (dispatch) => {
    console.log("getPages Called");
    dispatch({
        type: "FETCH_INDIA"
    });
    return axios.get(URL_INDIA, options)
        .then((response) => {
            dispatch({
                type: "FETCH_INDIA_FULFILLED",
                payload: response
            })
        })
        .catch((err) => {
            dispatch({
                type: "FETCH_INDIA_REJECTED",
                payload: err
            })
        })

}