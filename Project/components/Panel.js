import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import { Constants } from 'expo';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import * as api from '../api'

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
    }
    this.renderContent = this.renderContent.bind(this)
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  goToQuestions = (quest_id) => {
    api.fetchQuestById(quest_id)
      .then(res => {
        this.props.navigation.navigate('Question', {
          questions: res
        })
      })
  }

  renderContent(section, _, isActive) {
    return (
      <View style={styles.container}>

        <Animatable.View
          duration={1500}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >

          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            <Text style={styles.scoreMode}>{section.intro}</Text>
          </Animatable.Text >
          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            <Text style={styles.myDescription}>{section.full}</Text>
          </Animatable.Text >
          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            <Text style={styles.myDescription}>{section.suitability}</Text>
          </Animatable.Text >
          <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
            <Text style={styles.myDescription}>{section.venue_area}</Text>
          </Animatable.Text >

          {/* <Image
            style={styles.buttonImage}
            source={{ uri: section.icon_url }}
          >
          </Image> */}
          <View>
            <Button style={styles.button}
              title={"PLAY ME NOW"}
              onPress={() => {
                this.goToQuestions(section.quest_id)
              }} />

          </View>
        </Animatable.View >

      </View >
    );
  }


  render() {
    const { navigate } = this.props.navigation;
    const { multipleSelect, activeSections } = this.state;
    const CONTENT = this.props.quests.map(quest => {
      return {
        title: quest.title, intro: quest.intro_text,
        quest_id: quest.id,
        full: quest.full_text,
        icon_url: quest.icon_url,
        suitability: quest.suitability,
        venue_id: quest.venue_id
      }
    })
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          <Accordion
            style={styles.accordionStyle}
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED158',//'transparent',//'#F5FCFF',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  button: {
    color: 'purple',
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
    color: 'green',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    // backgroundColor: 'purple,'
  },
  content: {
    padding: 20,
    backgroundColor: '#FED158',
  },
  active: {
    backgroundColor: 'white',//'rgba(255,255,255,1)',
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
    // padding: 10,
    // justifyContent: 'center',
    // fontSize: 16,
    // alignItems: 'center',

    // textAlign: 'center',
    // fontSize: 16,
    // fontWeight: '500',
    // color: '#333',

  },
  accordionStyle: {
    padding: 5,
    backgroundColor: '#333',

  },

});

export default Panel;
