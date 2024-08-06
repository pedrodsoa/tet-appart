import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';

export default function AtualizaUsuario({route, navigation}) {
  
  const ID = route.params.id;
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [deleted,setDeleted ] = useState(false);
  const [updated,setUpdated ] = useState(false);


  useEffect(()=>{

    async function fetchItem(){
      await fetch('https://season-pedrodsoa.glitch.me/usuarios/'+ ID,{
        headers:{
          'Content-Type':'application/json'
        }
      }).then((res)=> res.json()).then((res) =>{

        setNome(res[0].usu_nome);
        setEmail(res[0].usu_email);

      }).catch((err)=>{
        console.log(err)
      })
    }
    fetchItem();
  },[])
  const Update = () => {
    var userObj = { nome: nome, email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    fetch('https://season-pedrodsoa.glitch.me/usuarios/'+ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      .then((response) => response.json())
      .then((json) => {
        
        console.log(json);
        if(json.mensagem == "atualizado!")
          setUpdated(true);
          setDeleted(false);


      })
      .catch((err) => {
        console.log(err);
      });
  };

const Delete = () => {
        console.log(ID);
    fetch('https://season-pedrodsoa.glitch.me/usuarios/'+ID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if(json.mensagem == "deletado!")
          setDeleted(true);
          navigation.navigate("Login");
          setUpdated(false)

        console.log(json);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{...styles.container, backgroundColor:"#FFF"}}>
    
      <TextInput
        style={{ ...styles.input, marginTop: 20 }}
        onChangeText={(text) => {
          setNome(text);
        }}
        placeholder="Nome"
        value={nome}/>
      <TextInput
        style={{ ...styles.input, marginTop: 20 }}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder="E-mail"
        value={email}></TextInput>
      <TextInput
        style={{ ...styles.input, marginTop: 20 }}
        onChangeText={(text) => {
          setSenha(text);
        }}
        placeholder="Senha"></TextInput>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity style={styles.button} onPress={Update}>
        Atualizar
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.button, marginLeft: 10}} onPress={Delete}>
        Deletar
      </TouchableOpacity>
      </View>
      {deleted && (
        <View>
          <Text style={{color:"#F00"}}>Deletado com sucesso</Text>
        </View>
      )
      }
           {updated && (
        <View>
          <Text style={{color:"#00F"}}>Atualizado com sucesso</Text>
        </View>
      )
      }
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
