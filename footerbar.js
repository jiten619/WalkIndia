import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


const FooterBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" size={20} color={'#fff'} />
        <Text style={styles.iconLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Task')}> 
        <Icon name="today-outline" size={20} color={'#fff'} />
        <Text style={styles.iconLabel}>Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Invite')}>
        <Icon name="person-add-outline" size={20} color={'#fff'} />
        <Text style={styles.iconLabel}>Invite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Profile')}>
        <Icon name="person-circle-outline" size={20} color={'#fff'} />
        <Text style={styles.iconLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 10,
    color: 'white',
  },
});

export default FooterBar;