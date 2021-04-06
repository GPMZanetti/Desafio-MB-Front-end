import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IniciarSessão from './pages/iniciarSessao';
import CadastrarConta from './pages/cadastrarConta';
import Carregando from './pages/carregando';
import Início from './pages/inicio';
import Eventos from './pages/eventos';
import Ingressos from './pages/ingressos';
import Configurações from './pages/configurações';
import ContextoDeAutenticação from './context';
import requisição from './functions/requisição';

export default function App() {
  const [estado, despachar] = React.useReducer(
    (estadoAnterior, ação) => {
      switch (ação.tipo) {
        case 'RECUPERAR_TOKEN':
          return {
            ...estadoAnterior,
            tokenDeUsuário: ação.token,
            carregando: false,
          };
        case 'ENTRAR':
          return {
            ...estadoAnterior,
            saindo: false,
            tokenDeUsuário: ação.token,
          };
        case 'SAIR':
          return {
            ...estadoAnterior,
            saindo: true,
            tokenDeUsuário: null,
          };
      }
    },
    {
      carregando: true,
      saindo: false,
      tokenDeUsuário: null,
    }
  );

  React.useEffect(() => {
    const inicializarAsync = async () => {
      let tokenDeUsuário;

      try {
        tokenDeUsuário = await getItemAsync('tokenDeUsuario');
      }
      catch (e) {
      }

      despachar({ tipo: 'RECUPERAR_TOKEN', token: tokenDeUsuário });
    };

    inicializarAsync();
  }, []);

  const contextoDeAutenticação = React.useMemo(
    () => ({
      entrar: async (dados) => {
        let tokenDeUsuário;
        let situação = "Erro";
        let dadosResposta = "Sem dados";

        try {
          res = await requisição.post('iniciarSessao', 'email=' + dados.email + '&senha=' + dados.senha);
          if (res.situação === 'Sucesso') {
            tokenDeUsuário = res.dados;
            await setItemAsync('tokenDeUsuario', toString(tokenDeUsuário));
            despachar({ tipo: 'ENTRAR', token: tokenDeUsuário });
            situação = "Sucesso";
          }
          else {
            situação = "Erro";
            dadosResposta = res.dados;
          }
        }
        catch {
          situação = "Erro";
          dadosResposta = "Erro no servidor. Tente novamente.";
        }
        return { situação, dados: dadosResposta};
      },
      sair: async () => {
        await deleteItemAsync('tokenDeUsuario');
        despachar({ tipo: 'SAIR' });
      },
    }),
    []
  );

  const Aba = createBottomTabNavigator();

  function Abas() {
    return (
      <Aba.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let nomeDoÍcone;

            if (route.name === 'Início') {
              nomeDoÍcone = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Eventos') {
              nomeDoÍcone = focused ? 'calendar' : 'calendar-outline';
            }
            else if (route.name === 'Ingressos') {
              nomeDoÍcone = focused ? 'ticket' : 'ticket-outline';
            }
            else if (route.name === 'Configurações') {
              nomeDoÍcone = focused ? 'account' : 'account-outline';
            }

            return <MaterialCommunityIcons name={nomeDoÍcone} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#7100CA',
          inactiveTintColor: 'gray',
        }}>
        <Aba.Screen name="Início" component={Início} />
        <Aba.Screen name="Eventos" component={Eventos} />
        <Aba.Screen name="Ingressos" component={Ingressos} />
        <Aba.Screen name="Configurações" component={Configurações} />
      </Aba.Navigator>
    );
  }

  const Pilha = createStackNavigator();

  return (
    <ContextoDeAutenticação.Provider value={contextoDeAutenticação}>
      <NavigationContainer>
        <Pilha.Navigator>
          {estado.carregando ? (
            <Pilha.Screen name="Carregando" component={Carregando} />
          ) : estado.tokenDeUsuário == null ? (
            <>
              <Pilha.Screen
                name="Iniciar sessão"
                component={IniciarSessão}
                options={{
                  title: 'Iniciar sessão',
                  animationTypeForReplace: estado.saindo ? 'pop' : 'push',
                }}
              />
              <Pilha.Screen name="Cadastrar conta" component={CadastrarConta} />
            </>
          ) : (
            <Pilha.Screen name="Abas" component={Abas} />
          )}
        </Pilha.Navigator>
      </NavigationContainer>
    </ContextoDeAutenticação.Provider>
  );
};