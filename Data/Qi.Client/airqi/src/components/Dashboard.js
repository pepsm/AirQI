import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from 'react';
import fetchStationsData from '../services/pull_stations';
import Layout from "./Layout";
import Loading from "./Loading";

const { REACT_APP_API_URL } = process.env;
export default function Dashboard() {

    const [hubConnection, setHubConnection] = useState(null);
    const [stations, setStationData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching data
        const setStationsData = async () => {
            fetchStationsData()
                .then(json => {
                    setLoading(false);
                    console.log(json.data);
                    setStationData(json.data);
                })
                .catch(err => {
                    console.error(err.message);
                });
        }

        setStationsData();
    }, []);

    useEffect(() => {

        // Create Hub Connection.
        const createHubConnection = async () => {

            const hubConnect = new HubConnectionBuilder()
            .withUrl(REACT_APP_API_URL + "livestations")
            .withAutomaticReconnect()
            .build();
            
            // Set the initial SignalR Hub Connection.
            setHubConnection(hubConnect);
            
        }

        createHubConnection();
    }, []);

    useEffect(() => {

        const startHubConnection = async () => {
            if (hubConnection) {
                await hubConnection
                    .start()
                    .then((result) => {
                        console.log("Hub Connected!");

                        hubConnection.on("GetNewStations", (stations) => {
                            console.log(stations);
                            setStationData([stations]);
                        });
                    })
                    .catch((e) => console.log("Connection failed: ", e));
            }
        }
         
        startHubConnection();

    }, [hubConnection]);


    // Render the information
    return loading ? <Loading /> : <Layout collection={stations} />;

} 