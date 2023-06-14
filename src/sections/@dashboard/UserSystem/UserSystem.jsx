import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Typography,
  Avatar,
  Button,
  Stack,
  Card,
  Popover,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';
import { Icon as Iconify } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, updateUser } from '../../../redux/modules/user';
import sentenceCase from '../../../utils/sentenceCase';

const UserSystem = () => {
  const [selected, setSelected] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.usuarios);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleEditClick = (event, user) => {
    setEditData(user);
    setEditMode(true);
  };

  const handleEditCancel = () => {
    setEditData({});
    setEditMode(false);
  };

  const handleEditSave = () => {
    dispatch(updateUser(editData));
    setEditData({});
    setEditMode(false);
  };

  const handleDeleteClick = (event, id) => {
    dispatch(deleteUser(id));
  };

  const handleDeleteMultipleClick = () => {
    selected.forEach((id) => dispatch(deleteUser(id)));
    setSelected([]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Filtrar usuarios en función del término de búsqueda
  const filteredUsers = users.usuarios.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el índice inicial y final de los usuarios a mostrar en la página actual
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Obtener los usuarios de la página actual
  const usersOnPage = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      <TextField label="Search" value={searchTerm} onChange={handleSearch} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === usersOnPage.length}
                  indeterminate={selected.length > 0 && selected.length < usersOnPage.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersOnPage.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(user.id)}
                    onChange={(event) => handleClick(event, user.id)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={user.name} src={user.avatar} />
                    <Typography variant="body2">{user.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{sentenceCase(user.role)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={(event) => handleEditClick(event, user)}>
                      <Iconify icon="mdi:account-edit" />
                    </IconButton>
                    <IconButton size="small" onClick={(event) => handleDeleteClick(event, user.id)}>
                      <Iconify icon="mdi:delete" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
          Rows per page:
        </Typography>
        <FormControl variant="outlined" size="small">
          <Select value={rowsPerPage} onChange={handleRowsPerPageChange} label="Rows per page">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="caption" color="text.secondary">
          {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
        </Typography>
      </Box>

      {selected.length > 0 && (
        <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">{`${selected.length} selected`}</Typography>
            <Button variant="outlined" color="error" size="small" onClick={handleDeleteMultipleClick}>
              Delete Selected
            </Button>
          </Stack>
        </Card>
      )}

      <Popover
        open={editMode}
        onClose={handleEditCancel}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Card variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Name"
              value={editData.name || ''}
              onChange={(event) => setEditData({ ...editData, name: event.target.value })}
            />
            <TextField
              label="Username"
              value={editData.username || ''}
              onChange={(event) => setEditData({ ...editData, username: event.target.value })}
            />
            <TextField
              label="Email"
              value={editData.email || ''}
              onChange={(event) => setEditData({ ...editData, email: event.target.value })}
            />
            <FormControl>
              <InputLabel>Role</InputLabel>
              <Select
                value={editData.role || ''}
                onChange={(event) => setEditData({ ...editData, role: event.target.value })}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleEditSave}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleEditCancel}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Popover>
    </>
  );
};

export default UserSystem;
