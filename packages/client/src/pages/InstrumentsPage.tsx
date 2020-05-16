import React, {useCallback, useState} from "react";
import './InstrumentsPage.css';
import InstrumentsTable from "../components/InstrumentsTable/InstrumentsTable";
import Settings from "../config/settings";
import {useFetch} from "../hooks/useFetch.hook";
import axios from 'axios';
import {IInstrument} from "../interfaces";

const INSTRUMENTS_URL = `${Settings.get().BASE_URL}/instruments/`;

/** Smart component incharge of managing the instruments view */
export default function InstrumentsPage() {
    let [updateCounter, setUpdateCounter] = useState(0);
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [instrumentType, setInstrumentType] = useState("");
    const [query, setQuery] = useState("");

    // Get instruments
    const {error, loading, data: instruments} = useFetch({url: INSTRUMENTS_URL, counter: updateCounter});

    // If instruments received, filter them by teh search query.
    let showInstruments = instruments && instruments.filter((inst: IInstrument) => {
        return inst.name!.toLowerCase().includes(query.toLowerCase())
    });

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
                (loading && !instruments) ?
                    <div> loading </div> :
                    <div>
                        <br/>
                        <div>
                            <input type="text" placeholder={"Name"} value={name} onChange={e => setName(e.target.value)}/>
                            <input type="text" placeholder={"Symbol"} value={symbol} onChange={e => setSymbol(e.target.value)}/>
                            <input type="text" placeholder={"instrument Type"} value={instrumentType} onChange={e => setInstrumentType(e.target.value)}/>
                            <button onClick={() => saveInstrument()}>Save instrument</button>
                        </div>
                        <div>
                            <input type="text" placeholder={"Search"} value={query} onChange={e => setQuery(e.target.value)}/>
                        </div>
                        <br/>
                        <InstrumentsTable instruments={showInstruments} onDelete={deleteInstrument}/>
                    </div>
            }
        </div>
    );
}
