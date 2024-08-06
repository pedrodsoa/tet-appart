import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default function Login({navigation}) {

  const onClick = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}></TextInput>
      <TextInput style={{ ...styles.input, marginTop: 20 }}></TextInput>
      <TouchableOpacity style={styles.button} onPress={onClick}>Registrar-se </TouchableOpacity>
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
    borderColor: '#000',
    borderWidth: 1,
    width: 300,
    height: 40,
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
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
