import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {useState} from "react";

export default function Login({navigation}) {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

const Login = async() => {
    console.log("a");
    var userObj = { email: email, senha: senha };
    var jsonBody = JSON.stringify(userObj);
    console.log(jsonBody);
    const res = await fetch('https://season-pedrodsoa.glitch.me/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonBody,
    })
      
      .catch((err) => {
        console.log(err);
      });
      const data = await res.json();
      console.log(data)

      if(data.mensagem == "logado"){
        navigation.navigate("Update", { id: data.id});
        setErro(false);
      } else{
        setErro(true);
      }

  };

  const Register = () => {
    navigation.navigate("CadastroUsuario");
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="E-mail"  onChangeText={(text)=>{setEmail(text)}}></TextInput>
      <TextInput style={{ ...styles.input, marginTop: 20 }} onChangeText={(text)=>{setSenha(text)}} placeholder="senha"></TextInput>
      <TouchableOpacity style={styles.button} onPress={Login}>Logar</TouchableOpacity>
      <TouchableOpacity style={{fontSize:10}} onPress={Register}>não possui uma conta? Registrar</TouchableOpacity>
      <View>
        {erro && <Text style={{marginTop: 4, color:"#F00"}}>Senha Inválida.</Text>
        }
      </View>
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
    paddingLeft:10,
    borderColor: '#000',
    borderWidth: 1,
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems:"center",
    justifyContent:"center",
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
