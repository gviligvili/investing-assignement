import {createInstrument, deleteInstrument, getAllInstruments} from "../interface/instruments.interface";

export async function getInstrumentsController(req, res) {
    const instruments = await getAllInstruments()
    res.json(instruments);
}

export async function createInstrumentController(req, res) {
    const instrument = req.body;

    if (!instrument) {
        res.send(400);
        return;
    }

    const newInstrument = await createInstrument(instrument);
    res.json(newInstrument);
}

export async function putInstrumentController(req, res) {
    const instrumentId = req.params.id;

    if (!instrumentId) {
        res.send(400);
        return;
    }

    await deleteInstrument(instrumentId);
    res.send(204);
}
