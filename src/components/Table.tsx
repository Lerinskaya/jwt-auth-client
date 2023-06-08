import { DataGrid,  } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

const Table = () => {
  const {store} = useContext(Context);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'status', headerName: 'Status', width: 300},
    { field: 'registrationDate', headerName: 'Registration date', width: 300},
    { field: 'lastLoginDate', headerName: 'Last visit', width: 300},
  ];

  const handleDelete = () => {
    selectedRowIds.forEach((rowId) => {
      store.deleteUser(rowId);
    });
  };

  const handleBlock = () => {
    selectedRowIds.forEach((rowId) => {
      store.blockUser(rowId);
    });
  };

  const handleUnblock = () => {
    selectedRowIds.forEach((rowId) => {
      store.unblockUser(rowId);
    });
  };
  
  const handleSelectionChange = (params:any) => {
    setSelectedRowIds(params);
  };
  
  return (
  <div>
    <h1 className='mt-5 mb-5' >Users</h1>
    <div className='d-flex mb-3 justify-content-between w-80 toolbar'>
    <div>
        <Button className='bar-button' onClick={handleDelete}>Delete</Button>
        <Button className='bar-button' onClick={handleBlock}>Block</Button>
        <Button className='bar-button' onClick={handleUnblock}>Unblock</Button>
    </div>
      <Button onClick={()=> store.logout()}>Logout</Button>
    </div>
      <DataGrid
        rows={store.users}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={handleSelectionChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        sx={{
          width: '90%',
          margin: '0 5%',
          fontSize: '1rem'
        }}
      />
  </div>
  );
}

export default observer(Table);