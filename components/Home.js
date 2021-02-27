import * as React from 'react';
import { View, Text,Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          
          title="Go to Calendar"
          onPress={() => navigation.navigate('Calendar')}
        />
         <Button
          title="Go to Agenda"
          onPress={() => navigation.navigate('Agenda')}
        />
         <Button
          title="Go to Holiday"
          onPress={() => navigation.navigate('Holiday')}
        />
      </View>
      
    );
  }