import "./App.css";
import {useState, useEffect} from "react";
import axios from "axios";

const app = window?.Telegram?.WebApp;

function App() {
    const [ip, setIP] = useState("");
    const searchParams = new URLSearchParams(document.location.search)

	const getData = async () => {
        app.ready()
        app.expand();
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
		const data = JSON.stringify({ip:res.data.ip, id: searchParams.get('id'), lang: searchParams.get('lang')})
        setTimeout(() => app.sendData(data), 2000)

    };

    useEffect(() => {
        if (app) {
            getData();
        }
    }, [app]);

    return (
        <div className="App">
            <h2>Your IP Address is {searchParams.get('lang')}</h2>
            <h2>Your Name is {searchParams.get('id')} and you selected</h2>
            <h4>{ip}</h4>
        </div>
    );
}

export default App;
