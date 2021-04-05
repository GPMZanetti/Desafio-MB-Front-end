import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import estilos from '../../styles/geral';
import ContextoDeAutenticação from '../../context';

export default function IniciarSessão({ navigation }) {
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState("");

    const { entrar } = React.useContext(ContextoDeAutenticação);

    return (
        <View style={estilos.página}>
            <Text style={estilos.logo}>Gestão de Eventos</Text>
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setEmail}
                value={email}
                placeholder="Endereço de e-mail"
                keyboardType="email-address"
            />
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setSenha}
                value={senha}
                placeholder="Senha"
                keyboardType="default"
                secureTextEntry
            />
            <View style={estilos.botões}>
                <TouchableOpacity style={estilos.botão} onPress={async () => {
                    res = await entrar({ email, senha });
                    console.log(res);
                    if (res.situação === "Erro") {
                        setMensagem(res.dados);
                    }
                }}>
                    <Text style={estilos.textoDeBotão}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botão} onPress={() => navigation.navigate('Cadastrar conta')}>
                    <Text style={estilos.textoDeBotão}>CADASTRE-SE</Text>
                </TouchableOpacity>
                <Text style={estilos.textoAviso}>{mensagem}</Text>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}