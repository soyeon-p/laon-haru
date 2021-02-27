import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Agenda from './components/Agenda';
import Holiday from './components/Holiday';
import {NewView, CalendarScreen} from './components/Calendar';




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Agenda" component={Agenda} />
        {/* 넘어가는 제목 바꾸는 방법은 아래 코드와 사이트 참고해주세요 */}
        {/* https://reactnavigation.org/docs/headers  */}
        <Stack.Screen name="Holiday" component={Holiday}/>
        <Stack.Screen name="NewView" component={NewView} 
        options={({ route }) => ({ title: route.params.day.dateString })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;