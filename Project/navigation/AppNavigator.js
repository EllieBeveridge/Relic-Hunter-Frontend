import { createStackNavigator } from 'react-navigation';
import LandingPage from '../screens/LandingPage';
import Question from '../screens/Question'
import ScoreCard from '../screens/ScoreCard'

const AppNavigator = createStackNavigator({
  LandingPage: { screen: LandingPage },
  Question: { screen: Question },
  ScoreCard: { screen: ScoreCard },
})

export default AppNavigator;
