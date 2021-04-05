import React, { useState } from 'react';
import { Button, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import estilos from '../../styles/geral';
import requisição from '../../functions/requisição';
import ContextoDeAutenticação from '../../context';

export default function CadastrarConta({ navigation }) {
    const [nome, setNome] = useState(null);
    const [dataDeNascimento, setDataDeNascimento] = useState(new Date());
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const { entrar } = React.useContext(ContextoDeAutenticação);

    const criarConta = () => {
        if (nome === null || dataDeNascimento === null || email === null || senha === null) {
            setMensagem("Preencha todos os campos corretamente");
            return;
        }

        if (!email.includes("@")) {
            setMensagem("Preencha o e-mail corretamente");
            return;
        }
        
        requisição.post('cadastrarConta', 'nome=' + nome
            + '&dataDeNascimento=' + (dataDeNascimento.getMonth() + '/' 
            + dataDeNascimento.getDate() + '/' 
            + dataDeNascimento.getFullYear()) 
            + '&email=' + email 
            + '&senha=' + senha).then((res) => {
                if (res.situação === "Sucesso") {
                    entrar({ email, senha});
                }
                else {
                    setMensagem(res.dados);
                    return;
                }
        }).catch((erro) => {
            setMensagem("Erro: "+ erro);
            return;
        });
    };

    const formatarData = (data) => {
        return ("0" + data.getDate()).slice(-2) + '/' + ("0" + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear();
    };

    const mudarData = (evento, dataSelecionada) => {
        const dataAtual = dataSelecionada || dataDeNascimento;
        setShow(Platform.OS === 'ios');
        setDataDeNascimento(dataAtual);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={estilos.página}>
            <Text style={estilos.título}>Criação de conta</Text>
            <Text style={estilos.textoEsquerda}>Nome completo</Text>
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome completo"
                keyboardType="default"
            />
            <Text style={estilos.textoEsquerda}>Data de nascimento</Text>
            <Text
                style={estilos.campoDeTexto}
                onTouchStart={showDatepicker}
            >{formatarData(dataDeNascimento)}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    style={estilos.campoDeTexto}
                    value={dataDeNascimento}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={mudarData}
                />
            )}
            <Text style={estilos.textoEsquerda}>Endereço de e-mail</Text>
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setEmail}
                value={email}
                placeholder="Endereço de e-mail"
                keyboardType="email-address"
            />
            <Text style={estilos.textoEsquerda}>Senha</Text>
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setSenha}
                value={senha}
                placeholder="Senha"
                keyboardType="default"
                secureTextEntry
            />
            <View style={estilos.botões}>
                <TouchableOpacity style={estilos.botão} onPress={() => criarConta()}>
                    <Text style={estilos.textoDeBotão}>CRIAR CONTA</Text>
                </TouchableOpacity>
                <Text style={estilos.textoAviso}>{mensagem}</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}