/* eslint-disable react/button-has-type */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { Document, Page, pdfjs } from '@react-pdf/renderer';

import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { finishTaksTec, finishTask, takeTask, getAllTaskPendding } from '../../../redux/modules/task';
import { fDate, fDateTime } from '../../../utils/formatTime';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;

  & > * {
    margin-bottom: 8px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const columns = [
  //   {
  //     id: 'id',
  //     label: 'Seleccion',
  //     minWidth: 50,
  //   },
  {
    id: 'name',
    label: 'Fecha finalizacion',
    minWidth: 100,
  },
  {
    id: 'age',
    label: 'Descripcion tarea',
    minWidth: 50,
  },
  {
    id: 'gender',
    label: 'Acciones',
    minWidth: 50,
  },
  // {
  //   id: 'address',
  //   label: 'precio',
  //   minWidth: 150,
  // },
  // {
  //   id: 'check',
  //   label: 'Exitencia',
  // },
  // {
  //   id: 'canti',
  //   label: ' Defectuosos',
  // },
];

const FinishTaskTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [messageError, setMessageError] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [open, setOpen] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const [taskName, setTaskName] = useState('');
  const [taskPrice, setTaskPrice] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [pdfContent, setPdfContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedTasks, setSelectedTasks] = useState([]);

  fDate();
  fDateTime();
  function capitalizeFirstLetter(text) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const handleToggleSelect = (itemsId) => {
    if (selectedTasks.includes(itemsId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== itemsId));
    } else {
      setSelectedTasks([...selectedTasks, itemsId]);
    }
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const dispatch = useDispatch();

  const tecnicoId = useSelector((state) => state.auth.user.id);
  console.log('tecnico id', tecnicoId);

  useEffect(() => {
    dispatch(finishTaksTec(tecnicoId));
  }, [dispatch]);

  const tareas = useSelector((state) => state.task);
  console.log('tareas ', tareas);

  const usuario = useSelector((state) => state.auth);
  const role = usuario.user.roles;

  console.log('role', role);
  console.log('usuario', usuario);

  // const taskId = selectedTaskId
  // console.log("Id tarea ", taskId)

  // const handleEditClick = (task) => {
  //   setSelectedTaskId(task.id);
  //   setSelectedTaskEdit({
  //     description: task.description,
  //     note: task.note,
  //   });
  //   setOpen(true);
  // };
  // const [selectedTaskEdit, setSelectedTaskEdit] = useState({
  //   description: '',
  //   note: '',
  // });

  // function deleteHandler(items) {
  //   Swal.fire({
  //     title: 'Estas Seguro',
  //     text: 'No podras revertir esta operacion !',
  //     icon: 'advertencia',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, Borrar!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteProduct(items.id));
  //       Swal.fire('El producto ha sido borrado!');

  //       dispatch(getAllProduct());
  //     } else {
  //       Swal.fire('El producto  Esta Seguro !');
  //     }
  //   });
  // }

  // const handleCloseModal = () => {
  //   setSelectedTaskId(null);
  //   setSelectedTaskEdit({
  //     description: '',
  //     note: '',
  //   });
  //   setOpen(false);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  // const handleSubmit = (e) => {
  //   if (selectedTaskEdit.description && selectedTaskEdit.note) {
  //     e.preventDefault();

  //     const data = {
  //       ...selectedtaskEdit,
  //       id: selectedTaskId,
  //     };
  //     dispatch(updateTask(selectedTaskId, data));
  //     Swal.fire('¨Tarea Editado con Exito  !', 'You clicked the button!', 'success');
  //     dispatch(finishTaksTec());

  //     handleCloseModal();
  //     //   getAllAnalysis();
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Debe completar toda la informacion !',
  //     });

  //     handleCloseModal();
  //   }
  // };

 

  // const handleTakeTask = async (event) => {
  //   event.preventDefault();

  //   const taskId = selectedTask.id;

  //   console.log('taskId', taskId);
  //   console.log('tecnico', tecnicoId);
  //   try {
  //     setLoading(true);
  //     handleCloseModal();
  //     // Llama a la acción takeTask para tomar la tarea
  //     await dispatch(takeTask(taskId, tecnicoId));

  //     // Si llegamos aquí, la tarea se tomó con éxito
  //     Swal.fire('Tarea tomada con éxito!', '', 'success');

  //     // Actualiza la lista de tareas después de tomar una tarea
  //     dispatch(getAllTaskPendding());

  //     setMessageError(null); // Limpia cualquier mensaje de error anterior
  //   } catch (error) {
  //     console.error(error);

  //     // Manejo de errores, puedes personalizar según tus necesidades
  //     setLoading(false);

  //     setMessageError(error.message);
  //     Swal.fire('Algo pasó', error.message, 'error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = () => {
    // Lógica para realizar la búsqueda de pacientes en la API y actualizar el estado del componente con los resultados.
  };

  const isDeleteButtonDisabled = setSelectedTasks.length === 0;

  // Define las columnas que deben mostrarse según el rol
  // const visibleColumns = columns.filter((column) => {
  //   if (column.id === 'Seleccion') {
  //     // Muestra la columna de acciones solo para el rol de administrador
  //     return roles === 'ROLE_ADMIN';
  //   }
  //   // Muestra todas las demás columnas
  //   return true;
  // });

  return (
    <>
      <hr />
      {/* Modal Ver tarea */}
      
      <Modal open={selectedTask !== null} onClose={() => setSelectedTask(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Aquí va el contenido del modal */}
          {selectedTask && (
            <>
              <h2>Tarea</h2>

              <h2>{selectedTask.name}</h2>
              <p><strong>Nro de orden:</strong> {selectedTask.id}</p>

              <p>
                <strong>Cliente:</strong> {selectedTask.cliente?.name}
              </p>
              <p>
                <strong>Direccion:</strong> {selectedTask.cliente?.address}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedTask.description}
              </p>
              <p>
                <strong>Telefono:</strong> {selectedTask.cliente?.telf}
              </p>

              <p>
                <strong>Fecha Finalizada :</strong> {fDateTime(selectedTask.fechaTerminacion)}
              </p>
              {/* <p>
					<strong>Tecnico :</strong> {selectedTask.tecnico?.name}
				  </p>
				  <p>
					<strong>Telefono :</strong> {selectedTask.tecnico?.telephone}
				  </p> */}

              <Button variant="contained" onClick={() => setSelectedTask(null)}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
      {/* End Modal nalysis  */}

      <Box sx={{ m: 2 }}>
        {/* <Subtitles>Prueba</Subtitles> */}
        <TextField label="Buscar Tareas " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {' '}
                {columns.map((column) => (
                  <TableCell key={column.id} align="left" minWidth={column.minWidth}>
                    {' '}
                    {column.label}{' '}
                  </TableCell>
                ))}{' '}
              </TableRow>
            </TableHead>

            <TableBody>
              {' '}
              {Array.isArray(tareas.finishedtasks) && tareas.finishedtasks.length > 0 ? (
                tareas.finishedtasks
                  .filter((items) => items.description.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((items) => (
                    <TableRow key={items.id}>
                      {/* <Checkbox
					  checked={selectedTasks.includes(items.id)}
					  onChange={() => handleToggleSelect(items.id)}
					/>
				  */}
                      <TableCell align="left"> {fDateTime(items.fechaTerminacion)}</TableCell>
                      <TableCell align="left"> {capitalizeFirstLetter(items.description)}</TableCell>

                      <>
                        <TableCell className="tableCell">
                          <Button variant="contained" onClick={() => setSelectedTask(items)}>
                            Ver
                          </Button>
                        </TableCell>
                        {role === 'ROLE_ADMIN' && (
                          <>
                            {/* <TableCell className="tableCell">
                              <Button variant="contained" onClick={() => handleEditClick(items)}>
                                Editar
                              </Button>
                            </TableCell> */}

                            {/* <TableCell className="tableCell">
                              <Button
                                variant="contained"
                                style={{ backgroundColor: 'red', color: 'white' }}
                                id={items.id}
                                onClick={() => deleteHandler(items)}
                              >
                                Borrar
                              </Button>
                            </TableCell> */}
                          </>
                        )}
                      </>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No hay datos disponibles</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={tareas.finishedtasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          ></TablePagination>

          {/* <Button variant="contained" onClick={handleDeleteMultipleClick} disabled={isDeleteButtonDisabled}>Borrar seleccionados</Button> */}
        </TableContainer>
        <hr />
        {/* Agrega el botón para generar el PDF */}
        {/* <button onClick={generatePDF}>Generar PDF</button> */}

        {/* Muestra el botón de imprimir */}
        {pdfContent && (
          <div>
            <Button variant="contained" onClick={handlePrintClick}>
              Imprimir
            </Button>

            <Document file={pdfContent}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}
      </Box>
    </>
  );
};

export default FinishTaskTable;
