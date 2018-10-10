import { createStackNavigator } from 'react-navigation';
import LandingPage from '../screens/LandingPage';
import Question from '../screens/Question'
import ScoreCard from '../screens/ScoreCard'
import Logo from '../screens/Logo'
import CreateQuest from '../screens/CreateQuest'
import CreateQuestion from '../screens/CreateQuestion'


const AppNavigator = createStackNavigator({
  Logo: { screen: Logo },
  LandingPage: { screen: LandingPage },
  CreateQuest: { screen: CreateQuest },
  Question: { screen: Question },
  ScoreCard: { screen: ScoreCard },
  CreateQuestion: { screen: CreateQuestion }
})

export default AppNavigator;
