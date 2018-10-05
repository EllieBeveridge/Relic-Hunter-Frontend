import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    // color: '#000',
    padding: 10,
    margin: 40,
  },
  discard: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    // color: '#000',
    padding: 10,
    margin: 40, marginBottom: 20
  },
  submit: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    // color: '#000',
    padding: 10,
    margin: 40, marginBottom: 20
  }
})
