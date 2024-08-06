import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState } from 'react';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const Register = () => {
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('https://season-pedrodsoa.glitch.me/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Login = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setNome(text);
        }}
        placeholder="Nome"></TextInput>
      <TextInput
        style={{ ...styles.input, marginTop: 20 }}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder="E-mail"></TextInput>
      <TextInput
        style={{ ...styles.input, marginTop: 20 }}
        onChangeText={(text) => {
          setSenha(text);
        }}
        placeholder="Senha"></TextInput>
      <TouchableOpacity style={styles.button} onPress={Register}>
        Registrar
      </TouchableOpacity>
      <TouchableOpacity style={{ fontSize: 10 }} onPress={Login}>
        já possui uma conta? Entrar
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
  },
  input: {
    paddingLeft: 10,
    borderColor: '#000',
    borderWidth: 1,
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 5,
    borderColor: '#000',
    borderWidth: 1,
    width: 110,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },

});
