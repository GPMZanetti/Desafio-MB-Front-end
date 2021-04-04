import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import estilos from '../../styles/geral';

export default function CadastrarConta({ navigation }) {
    const [nome, setNome] = useState(null);
    const [dataDeNascimento, setDataDeNascimento] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);

    const criarConta = () => {
        navigation.navigate('Iniciar sessão');
    }

    return (
        <View style={estilos.página}>
            <Text style={estilos.título}>Criação de conta</Text>
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setNome}
                value={nome}
                placeholder="Nome completo"
                keyboardType="default"
            />
            <TextInput
                style={estilos.campoDeTexto}
                onChangeText={setDataDeNascimento}
                value={dataDeNascimento}
                placeholder="Data de nascimento"
                keyboardType="number-pad"
            />
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
                <TouchableOpacity style={estilos.botão} onPress={() => criarConta()}>
                    <Text style={estilos.textoDeBotão}>CRIAR CONTA</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}