import React from 'react';
import {IInstruments} from "../../interfaces";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import "./InstrumentsTable.css"

interface InstrumentsTableProps {
    instruments: Array<IInstruments>,
    onDelete: (instrumentId: number) => void,
}

export default function InstrumentsTable({instruments, onDelete}: InstrumentsTableProps) {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th></Th>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    <Th>Symbol</Th>
                    <Th>Delete</Th>
                </Tr>
            </Thead>
            <Tbody className="table-body">
                {
                    instruments.map((t, index) =>
                        (<Tr key={t.instrumentId}>
                            <Td>{index + 1}</Td>
                            <Td>{t.name}</Td>
                            <Td>{t.instrumentType}</Td>
                            <Td>{t.symbol}</Td>
                            <Td onClick={() => { onDelete && onDelete(t.instrumentId)}}>X</Td>
                        </Tr>))
                }
            </Tbody>
        </Table>
    )
}
