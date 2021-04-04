import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import IniciarSessão from './pages/iniciarSessao';
import CadastrarConta from './pages/cadastrarConta';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Iniciar sessão" component={IniciarSessão} />
        <Stack.Screen name="Cadastrar conta" component={CadastrarConta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};