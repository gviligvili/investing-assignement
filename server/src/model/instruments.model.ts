/**
 * In a real life scenerio, we would have an ORM managed model (or self managed model).
 * which of course connected to a db.
 */

import {instrumentsDBTable} from "./instruments.DBtable";

/**
 * We don't got auto increment, so I'm taking the highet id provided in the mock and I'm gonna increment from that.
 * Please leave it out of the scalability factor because it's pretty obvious it's in-memory only for the assignment purpose.
 */
let highestId = Math.max(...(Object.keys(instrumentsDBTable) as any))

/** Async is not needed, but just for real life scenario **/
async function find() {
    return Object.values(instrumentsDBTable);
}

async function createInstrument(instrument) {
    highestId++;
    const currentID = highestId;
    instrument.instrumentId = currentID;
    instrumentsDBTable[currentID] =  instrument
    return instrument;
}

async function deleteInstrument(id) {
    delete instrumentsDBTable[id];
}

const InstrumentModel = {
    find,
    create: createInstrument,
    delete: deleteInstrument,
}

export default InstrumentModel;
