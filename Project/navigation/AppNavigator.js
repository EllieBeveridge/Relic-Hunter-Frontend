import { createStackNavigator } from 'react-navigation';
import LandingPage from '../screens/LandingPage';
import Question from '../screens/Question'
import ScoreCard from '../screens/ScoreCard'
import Logo from '../screens/Logo'


const AppNavigator = createStackNavigator({
  Logo: { screen: Logo },
  LandingPage: { screen: LandingPage },
  Question: { screen: Question },
  ScoreCard: { screen: ScoreCard }
})

export default AppNavigator;
