import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  question: {
    textAlign: 'left',
    fontSize: 36,
    color: '#583E5C',
    fontWeight: 'bold',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,

  },
  takePictureButton: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  scoreMode: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 15,
    color: 'green',
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 17,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
})
