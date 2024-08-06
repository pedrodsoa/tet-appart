7
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroUsuario from './components/CadastroUsuario';
import Home from "./components/Home";
import Login from './components/Login';
import AtualizaUsuario from "./components/AtualizaUsuario"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Update" component={AtualizaUsuario}/>
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario}/>
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



