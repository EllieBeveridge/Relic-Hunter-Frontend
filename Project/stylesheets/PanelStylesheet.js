import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED158',//'transparent',//'#F5FCFF',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  buttonImage: {
    width: 30,
    height: 25,
    alignItems: 'center',
  },

  scoreMode: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    color: '#583E5C',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#583E5C'
  },
  content: {
    padding: 20,
    backgroundColor: '#FED158',
  },
  active: {
    backgroundColor: '#FAE19D',//'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: '#FED158',//'rgba(245,252,255,1)',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  myDescription: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#583E5C'

  },
  accordionStyle: {
    padding: 5,
    backgroundColor: '#583E5C',

  },

});