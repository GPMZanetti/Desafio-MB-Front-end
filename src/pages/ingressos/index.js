import React from 'react';
import { Button, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import ContextoDeAutenticação from '../../context';
import estilos from '../../styles/geral';

export default function Ingressos() {
    const { sair } = React.useContext(ContextoDeAutenticação);

    return (
        <View style={estilos.página}>
            <Text style={estilos.texto}>Sessão iniciada!</Text>
            <TouchableOpacity style={estilos.botão} onPress={sair}>
                <Text style={estilos.textoDeBotão}>SAIR</Text>
            </TouchableOpacity>
            
            <StatusBar style='auto' />
        </View>
    );
}