import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import buttonStyles from '../stylesheets/buttonStyles'
import { Constants } from 'expo'
import styles from '../stylesheets/PanelStylesheet'
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
        <Icon
          name='chevron-down'
          type='entypo'
          color='#583E5C'
          size={20}
        />
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

          <Text style={styles.myDescription}>Aimed at:{section.suitability}</Text>
          <Text style={styles.myDescription}>Takes place at:{section.venue_area}</Text>

          <View>
            <Button
              buttonStyle={buttonStyles.buttonStyle}
              title="Start Quest"
              icon={{ name: 'flask', type: 'font-awesome' }}
              onPress={() =>
                this.goToQuestions(section.quest_id)
              }
            />
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
        title: quest.title,
        intro: quest.intro_text,
        quest_id: quest.id,
        full: quest.full_text,
        icon_url: quest.icon_url,
        suitability: quest.suitability,
        venue_id: quest.venue_id,
        venue_area: quest.venue_area
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

export default Panel;
