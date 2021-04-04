import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    página: {
      flex: 1,
      backgroundColor: '#E5C3FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        fontFamily: 'Roboto',
        fontSize: 36,
        color: '#8800FF',
        fontWeight: 'bold',
        marginVertical: 50,
    },
    título: {
        fontFamily: 'Roboto',
        fontSize: 24,
        color: '#8800FF',
        marginVertical: 50,
    },
    campoDeTexto: {
        backgroundColor: '#F2F2F2',
        height: 40,
        width: 230,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#41058D',
        borderRadius: 10,
    },
    botão: {
        height: 40,
        width: 230,
        backgroundColor: '#8A03F4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
    },
    textoDeBotão: {
        color: '#FBF4FF',
    },
    botões: {
        margin: 20,
    },
});