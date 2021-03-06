import InstrumentModel from "../model/instruments.model";

export async function getAllInstruments() {
    return InstrumentModel.find();
}

export async function createInstrument(instrument) {
    return InstrumentModel.create(instrument);
}

export async function deleteInstrument(id) {
    return InstrumentModel.delete(id)
}
