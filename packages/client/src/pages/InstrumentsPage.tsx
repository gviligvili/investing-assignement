import React, {useCallback, useState} from "react";
import './InstrumentsPage.css';
import InstrumentsTable from "../components/InstrumentsTable/InstrumentsTable";
import Settings from "../config/settings";
import {useFetch} from "../hooks/useFetch.hook";
import axios from 'axios';

const INSTRUMENTS_URL = `${Settings.get().BASE_URL}/instruments/`;

export default function InstrumentsPage() {
    let [updateCounter, setUpdateCounter] = useState(0);
    const {error, loading, data } = useFetch({ url: INSTRUMENTS_URL, counter: updateCounter});
    const onInstrumentDelete = useCallback(async (instrumentId) => {
        debugger;
        const res  = await axios(`${INSTRUMENTS_URL}${instrumentId}`, { method: "DELETE"});
        debugger;
        setUpdateCounter((prevState) => prevState+1);
    }, [])
    return (
        <div className="instruments-page">
            {error ?
                <div className="error">{error}</div>
                :
                (loading && !data) ?
                    <div> loading </div> :
                    <div>
                        <InstrumentsTable instruments={data} onDelete={onInstrumentDelete}/>
                    </div>
            }
        </div>
    );
}
