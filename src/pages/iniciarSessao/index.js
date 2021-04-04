import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import estilos from '../../styles/geral';

export default function IniciarSessão({ navigation}) {
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);

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
            />
            <View style={estilos.botões}>
                <TouchableOpacity style={estilos.botão}>
                    <Text style={estilos.textoDeBotão}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botão} onPress={() => navigation.navigate('Cadastrar conta')}>
                    <Text style={estilos.textoDeBotão}>CADASTRE-SE</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}