
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import navConfig from "./config";


export const filterAllowedRoutes = (userRoles) => {
    if (userRoles.includes('ROLE_ADMIN')) {
      return navConfig; // Mostrar todas las rutas para el rol de administrador
    } 
  
    if (userRoles.includes('ROLE_TECNICO')) {
      // Lista de rutas permitidas para ROLE_TECNICO
      const allowedRoutesForTecnico = [ '/dashboard/mytask'];
  
      // Filtrar rutas permitidas para el rol de técnico
      return navConfig.filter((route) => allowedRoutesForTecnico.includes(route.path));
    }
  
    return []; // No se muestran rutas para otros roles
  };
  
  