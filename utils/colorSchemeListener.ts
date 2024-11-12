import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

/**
 * Custom hook que se suscribe a los cambios de esquema de color del sistema.
 * Devuelve el esquema de color actual, que puede ser 'dark' o 'light'.
 */
export const useColorSchemeListener = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => subscription.remove();
  }, []);

  return colorScheme;
};