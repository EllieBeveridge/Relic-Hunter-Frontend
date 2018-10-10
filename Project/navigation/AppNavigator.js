import { createStackNavigator } from 'react-navigation';
import LandingPage from '../screens/LandingPage';
import Question from '../screens/Question'
import ScoreCard from '../screens/ScoreCard'
import Logo from '../screens/Logo'
import CreateQuest from '../screens/CreateQuest'
import CreateQuestion from '../screens/CreateQuestion'
import AddPicture from '../screens/AddPicture'
import TestPics from '../screens/TestPics'


const AppNavigator = createStackNavigator({
  Logo: { screen: Logo },
  CreateQuest: { screen: CreateQuest },
  LandingPage: { screen: LandingPage },
  CreateQuest: { screen: CreateQuest },
  Question: { screen: Question },
  ScoreCard: { screen: ScoreCard },
  CreateQuestion: { screen: CreateQuestion },
  AddPicture: { screen: AddPicture },
  TestPics: { screen: TestPics }
})

export default AppNavigator;
