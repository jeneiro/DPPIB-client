import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { webapibaseurl } from '../global';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ReactModal from 'react-modal';
import axios from 'axios';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        marginLeft: '10%',
        height: '70%',

        transform: 'translate(-50%, -50%)',
        width: '70%',
    },
};

const Records = () => {
    const [record, setRecord] = useState([]);
    const [modalSwitch, setModalSwitch] = useState(false);
    const [modalContent, setModalContent] = useState('');
    useEffect(() => {
        const getRecords = `${webapibaseurl}records/`;
        axios.get(getRecords).then((response) => {
            setRecord(response.data);
            return response;
        });
    }, []);

    let recordRow = record.map((rec, index) => {
        //let id = 1;

        let row = {
            id: index + 1,
            ocid: rec.OCID,
            month: rec.month,
            year: rec.year,
        };
        return row;
    });

    // Table columns
    const columns = [
        { field: 'id', headerName: 'S/N', width: 100 },
        { field: 'month', headerName: 'Month', width: 200 },

        { field: 'year', headerName: 'Year', width: 160 },
        { field: 'ocid', headerName: 'File', width: 240 },

        {
            field: '',
            headerName: 'Download/View',
            width: 220,
            disableClickEventBubbling: true,
            renderCell: (cellValue) => {
                const handleSelect = (e) => {
                    var selectedAction = e.target.value;
                    console.log(selectedAction);
                    let id = cellValue.row.ocid;
                    const getRecords = `${webapibaseurl}records/json-download/${id}`;
                    if (selectedAction === 'View') {
                        axios.get(getRecords).then((response) => {
                            const viewObj = response.data;
                            console.log(viewObj);
                            //  document.getElementById('json').innerHTML = JSON.stringify(viewObj, undefined, 2);
                            setModalContent(JSON.stringify(viewObj, undefined, 2));
                            setModalSwitch(true);
                        });
                    } else {
                        axios.get(getRecords).then((response) => {
                            const viewObj = response.data;
                            const filename = id + '.json';
                            var data = JSON.stringify(viewObj, undefined, 2);
                            var blob = new Blob([data], { type: 'text/json' }),
                                e = document.createEvent('MouseEvents'),
                                a = document.createElement('a');

                            a.download = filename;
                            a.href = window.URL.createObjectURL(blob);
                            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                            a.dispatchEvent(e);
                        });
                    }
                };

                return (
                    <div className="form-row">
                        <div>
                            <Select labelId="label" id="select" onChange={handleSelect} value={''}>
                                <MenuItem value="View">View</MenuItem>
                                <MenuItem value="Download">Download</MenuItem>
                            </Select>
                        </div>
                    </div>
                );
            },
        },
    ];

    const rows = recordRow;

    return (
        <>
            <div className="card card-custom gutter-b example example-compact" style={{ padding: 50 }}>
                <div>
                    <ReactModal isOpen={modalSwitch} style={customStyles} contentLabel="Modal" appElement={document.getElementById('app')}>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                setModalSwitch(false);
                            }}
                        >
                            close
                        </button>
                        <div className="col-md-10 offset-md-1" style={customStyles}>
                            <pre id="json">{modalContent}</pre>
                        </div>
                    </ReactModal>
                </div>
                <div className="card-header">
                    <div className="card-title">
                        <h3 className="card-label">Records</h3>
                    </div>
                    <div className="card-toolbar">
                        <div className="example-tools"></div>
                    </div>
                </div>

                <div style={{ height: 400, width: '100%', backgroundColor: 'white' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} />
                </div>
            </div>
        </>
    );
};

export default Records;
