import {StyleSheet} from 'react-native';

const stylesDark = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f4f4',
    },

    menuText: {
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: isDarkMode ? '#121212' : '#f4f4f4',
    },

    timerButton: {
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: isDarkMode ? '#005685' : '#3DBBFF',
      height: 48,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    timerButtonText: {
      color: isDarkMode ? '#FFFFFF' : '#242424',
      fontWeight: 'bold',
      fontSize: 20,
    },
  });

export default stylesDark;
