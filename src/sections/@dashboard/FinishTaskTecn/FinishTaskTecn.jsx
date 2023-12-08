/* eslint-disable no-unused-expressions */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { Alert, Button, TextField } from '@mui/material';
import { getAllTask, createTask, getAllTaskPendding, finishTaksTec } from '../../../redux/modules/task';

import { TaskTable } from '../TaskTable';
import { FinishTaskTable } from '../FinishTaskTable';

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

const TableContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FinishTaskTecn = () => {
	
	const [errors, setErrors] = useState({});
	const { message } = useSelector((state) => state);
	const [loading, setLoading] = useState(false);
	const [selectButton, setSelectButton] = useState(null);
	const [messageError, setMessageError] = useState({});
  
	const dispatch = useDispatch();
  
	const [formInfo, setFormInfo] = useState({
	  description: '',
	
	 address:''
	});
	const [isFormValid, setIsFormValid] = useState(false);
  
	const validateForm = () => {
	  const {  description,  address } = formInfo;
	  setIsFormValid(
	
		  description.trim() !== '' &&
		  address.trim() !== '' 
		  
	  );
	};
  
	useEffect(() => {
	  validateForm();
	}, [formInfo]);

	const  tecnicoId = useSelector((state)=> state.auth.user.id)
	console.log("tecnico id", tecnicoId);
  
  
	useEffect(() => {
	  dispatch(finishTaksTec(tecnicoId));
	}, [dispatch]);
  
	function validate(formInfo) {
	  const errors = {};
	  
	 
	  formInfo.description ? (errors.description = '') : (errors.description = 'Ingrese una Descripcion');
	  formInfo.address ? (errors.address = '') : (errors.address = 'Ingrese una direccion ');
  
	
  
	  return errors;
	}
  
	function capitalizeFirstLetter(text) {
	  if (!text) return '';
	  return text.charAt(0).toUpperCase() + text.slice(1);
	}
  
	const handleChange = (event) => {
	  const { name, value } = event.target;
	  setFormInfo((prevFormInfo) => ({
		...prevFormInfo,
		[name]: value,
	  }));
	  setErrors(validate({ ...formInfo, [name]: value }));
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
	  setLoading(true);
	  dispatch(createTask(formInfo))
		.then((response) => {
		  setLoading(false);
		  Swal.fire('tarea creado con éxito!', '', 'success');
		  dispatch(getAllTask());
		  setFormInfo({
			
			description: '',
			
			address: '',
		  });
		  setSelectButton(null);
		  if (response.error) {
			setMessageError(response.error);
		  }
		})
		.catch((error) => {
		  console.log(error);
		  setLoading(false);
		  setSelectButton(null);
		  setMessageError(error.message);
		  Swal.fire(error.message);
		});
	};
  
	const navigate = useNavigate();
  
	const handleLinkClick = (link) => {
	  navigate(link);
	  console.log(`Redireccionando a ${link}`);
	};

	
	return (
		<>
		
		  {/* <Box sx={{ m: 8 }}>
			<Button style={{ marginRight: 3 }} variant="contained" onClick={() => setSelectButton()}>
			  Crear Tarea
			</Button>
	
			<Button
			  style={{ marginRight: 3 }}
			  variant="contained"
			  onClick={() => handleLinkClick('/dashboard/productos-defectuosos')}
			>
			  Productos Defectuosos
			</Button>
	
			<Button variant="contained" onClick={() => handleLinkClick('/dashboard/cargar-productos')}>
			  Carga Rapida de Productos
			</Button>
		  </Box> */}
	
		  <FinishTaskTable/>
	
		  <Modal open={selectButton !== null} onClose={() => setSelectButton(null)}>
			<Box
			  sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				borderRadius: '8px',
				boxShadow: 24,
				p: 4,
			  }}
			>
			  {/* Aquí va el contenido del modal */}
			  <form onSubmit={handleSubmit}>
				<FormContainer>
				  <FieldContainer>
					
					
					<TextField
					  required
					  label="Description"
					  name="description"
					  id="description"
					  value={formInfo.description}
					  onChange={handleChange}
					/>{' '}
					{errors.description && <span className="error-message"> {errors.description}</span>}
					<TextField
					  required
					  label="Nota"
					  name="note"
					  id="note"
					  value={formInfo.note}
					  onChange={handleChange}
					/>{' '}
					{errors.note && <span className="error-message"> {errors.note}</span>}
					{/* <TextField
					  required
					  label="Cantidad"
					  name="quantity"
					  id="quantity"
					  value={formInfo.quantity}
					  onChange={handleChange}
					/>{' '}
					{errors.quantity && <span className="error-message"> {errors.quantity}</span>}
				 */}
					{message && (
					  <Alert severity="error" sx={{ mt: 2 }}>
						{' '}
						{messageError}{' '}
					  </Alert>
					)}{' '}
				  </FieldContainer>
				  <ActionsContainer>
					<Button
					  type="submit"
					  onClick={handleSubmit}
					  variant="contained"
					  color="primary"
					  disabled={!isFormValid} // Deshabilitar el botón si isFormValid es false
					>
					  {loading ? 'Cargando...' : 'Crear Producto'}
					</Button>
				  </ActionsContainer>
				</FormContainer>
			  </form>
			  <hr />
			  <Button variant="contained" onClick={() => setSelectButton(null)}>
				Cerrar
			  </Button>
			</Box>
		  </Modal>
		</>
	  );
}



export default FinishTaskTecn;