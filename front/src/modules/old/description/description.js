import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const product = [
    {
        id:1,
        date: '02/07/2019',
        consommation: 1600,
        production: 2126
    },
    {
        id:2,
        date: '03/07/2019',
        consommation: 1200,
        production: 2641
    }, {
        id:3,
        date: '04/07/2019',
        consommation: 1500,
        production: 2645
    }];
export default class description extends React.Component {


    render() {
        return (
            <div>
                <h2>Information</h2>
                <BootstrapTable data={product}>
                    <TableHeaderColumn dataField='date' isKey={true} dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='consommation'>Consommation (kwh)</TableHeaderColumn>
                    <TableHeaderColumn dataField='production'>Production (kwh)</TableHeaderColumn>
                </BootstrapTable>
            </div>);

    }
}