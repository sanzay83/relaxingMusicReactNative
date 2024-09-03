import {StyleSheet, Dimensions} from 'react-native';
const {height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  appTitleMain: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 25,
  },

  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  menu: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  formCatagorySection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
  },

  appTitleContainer: {
    marginBottom: 15,
    marginTop: 15,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 0.9,
    textAlign: 'center',
  },

  selectedCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerr: {
    height: 50,
    width: '85%',
  },

  albumContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  audioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  musicControllerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },

  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  formSection: {
    marginBottom: 10,
    width: '100%',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  timeCountdown: {
    marginTop: 10,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
