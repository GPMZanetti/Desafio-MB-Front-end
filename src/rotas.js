import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

import IniciarSessão from './pages/iniciarSessao';
import CadastrarConta from './pages/cadastrarConta';
import Carregando from './pages/carregando';
import Início from './pages/inicio';
import ContextoDeAutenticação from './context';
import requisição from './functions/requisição';

const Pilha = createStackNavigator();

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
            <Pilha.Screen name="Início" component={Início} />
          )}
        </Pilha.Navigator>
      </NavigationContainer>
    </ContextoDeAutenticação.Provider>
  );
};