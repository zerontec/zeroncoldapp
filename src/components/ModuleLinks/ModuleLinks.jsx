import styled from 'styled-components';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {  useSelector } from "react-redux";

const LinkBoxContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap; /* Agrega la propiedad flex-wrap para que los elementos se envuelvan */
`;

const LinkBox = styled(Box)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ModuleLinks = () => {
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link);
    console.log(`Redireccionando a ${link}`);
  };
  const usuario = useSelector((state) => state.auth);

  const adminModules = [
    { link: '/dashboard/invoice', color: '#007bff', text: 'Ventas' },
    { link: '/dashboard/compras', color: '#ff6b6b', text: 'Compras' },
    { link: '/dashboard/submodule', color: '#00cc99', text: 'Usuarios De Sistema' },
     { link: '/dashboard/tareas', color: 'rgb(0, 204, 153)', text: 'Tareas' },
    { link: '/dashboard/alltask', color: '#FF5722', text: 'Tareas Admin' },
    { link: '/dashboard/reportes', color: '#ff8c00', text: 'Reportes' },
  ];

  const tecnicoModules = [
    { link: '/dashboard/tec/tareas', color: 'rgb(0, 204, 153)', text: 'Tareas' },
    { link: '/dashboard/tec/mytask', color: '#E91E63', text: 'Mis Tareas Por Realizar' },
    { link: '/dashboard/tec/mytaskfinish', color: 'rgb(33, 150, 243)', text: 'Mis tareas Terminadas' },
  ];

   // Selecciona los módulos según el rol del usuario
   const modulesToShow = usuario.user && usuario.user.roles
   ? usuario.user.roles.includes('ROLE_ADMIN') ? adminModules
   : usuario.user.roles.includes('ROLE_TECNICO') ? tecnicoModules
   : []
   : [];

  
   return (
    <LinkBoxContainer>
      {modulesToShow.map((module) => (
        <LinkBox key={module.link} style={{ backgroundColor: module.color }} onClick={() => handleLinkClick(module.link)}>
          <LinkText>{module.text}</LinkText>
        </LinkBox>
      ))}
    </LinkBoxContainer>
  );
};


export default ModuleLinks;
