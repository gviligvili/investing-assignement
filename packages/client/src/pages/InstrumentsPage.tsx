import React, {useCallback, useState} from "react";
import './InstrumentsPage.css';
import InstrumentsTable from "../components/InstrumentsTable/InstrumentsTable";
import Settings from "../config/settings";
import {useFetch} from "../hooks/useFetch.hook";
import axios from 'axios';
import {IInstrument} from "../interfaces";

const INSTRUMENTS_URL = `${Settings.get().BASE_URL}/instruments/`;

export default function InstrumentsPage() {
    let [updateCounter, setUpdateCounter] = useState(0);
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [instrumentType, setInstrumentType] = useState("");



    const {error, loading, data} = useFetch({url: INSTRUMENTS_URL, counter: updateCounter});

    const deleteInstrument = useCallback(async (instrumentId) => {
        await axios.delete(`${INSTRUMENTS_URL}${instrumentId}`);
        setUpdateCounter((prevState) => prevState + 1);
    }, [])

    const saveInstrument = useCallback(async () => {
        let instrument: IInstrument = { name, symbol, instrumentType};
        await axios.post(`${INSTRUMENTS_URL}`, instrument);
        setUpdateCounter((prevState) => prevState + 1);
        setName("");
        setSymbol("");
        setInstrumentType("");
    }, [name, symbol, instrumentType])

    return (
        <div className="instruments-page">
            {error ?
                <div className="error">{error}</div>
                :
                (loading && !data) ?
                    <div> loading </div> :
                    <div>
                        <br/>
                        <div>
                            <input type="text" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)}/>
                            <input type="text" placeholder={"Symbol"} value={symbol} onChange={e => setSymbol(e.target.value)}/>
                            <input type="text" placeholder={"instrument Type"} value={instrumentType} onChange={e => setInstrumentType(e.target.value)}/>
                            <button onClick={() => saveInstrument()}>Save instrument</button>
                        </div>
                        <br/>
                        <InstrumentsTable instruments={data} onDelete={deleteInstrument}/>
                    </div>
            }
        </div>
    );
}
