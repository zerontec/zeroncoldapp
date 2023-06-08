import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const LinkBoxContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 16px;
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
    // Agregar lógica para redireccionar al módulo correspondiente al hacer clic en el cuadro
	navigate(link);
	console.log(`Redireccionando a ${link}`);
  };

  return (
    <LinkBoxContainer>
      <LinkBox
        style={{ backgroundColor: '#007bff' }}
        onClick={() => handleLinkClick('/dashboard/invoice')}
      >
        <LinkText>Ventas</LinkText>
      </LinkBox>
      <LinkBox
        style={{ backgroundColor: '#ff6b6b' }}
        onClick={() => handleLinkClick('/modulo2')}
      >
        <LinkText>Compras</LinkText>
      </LinkBox>
      <LinkBox
        style={{ backgroundColor: '#00cc99' }}
        onClick={() => handleLinkClick('/modulo3')}
      >
        <LinkText>Usuarios De Sistema</LinkText>
      </LinkBox>


      <LinkBox
        style={{ backgroundColor: '#ffcc00' }}
        onClick={() => handleLinkClick('/dashboard/inventario')}
      >
        <LinkText>Inventario</LinkText>
      </LinkBox>



	  <LinkBox
      
        style={{ backgroundColor: '#ff8c00' }}
        onClick={() => handleLinkClick('modulo5')}
      >
        <LinkText>Reportes</LinkText>
      </LinkBox>

	  
    </LinkBoxContainer>
  );
};

export default ModuleLinks;
