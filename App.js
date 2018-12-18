import React from 'react';
import { FlatList, Button, TextInput, StyleSheet, Text, View } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import { List, ListItem } from 'react-native-elements'

//import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

const listPlayers = `
  query {
    listPlayers {
      items {
        id
        name
        wins
        loses
        ties
      }
    }
 }
`
const createPlayer = `
  mutation($name: String!) {
    createPlayer(input: {
      name: $name
  }) {
    id
    name
    wins
    loses
    ties
  }
}`

const updatePlayer = `
  mutation($id: ID!, $wins: Int, $loses: Int, $ties: Int) {
    updatePlayer(input: {
      id: $id
      wins: $wins
      loses: $loses
      ties: $ties
    }) {
      id
      name
      wins
      loses
      ties
    }
  }
`//error said input is missing id

const scoreType = ["wins","loses","ties"]

export default class App extends React.Component {

  state = { name: '', players: [] }
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listPlayers))
      console.log('graphqldata:', graphqldata)
      this.setState({ players: graphqldata.data.listPlayers.items })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  createPlayer = async () => {
    const player = this.state
    let graphqldata = {};
    if (player.name === '') return
    try {
      graphqldata=await API.graphql(graphqlOperation(createPlayer, player))
      console.log('player successfully created.')
    } catch (err) {
      console.log('error creating player...', err)
    }
    console.log(graphqldata)
    const players = [...this.state.players, graphqldata.data.createPlayer]
    this.setState({ players, name: '' })
    
  }
  updatePlayer = async (player, field, addsub) => {
    player[field] = player[field] + addsub;
    let playerList = this.state.players.filter((thePlayer) => {
      if(player.id !== thePlayer.id) {
        return true;
      }
    })
    this.setState({players: [...playerList, player]})
    try {
      await API.graphql(graphqlOperation(updatePlayer, player))
      console.log('player successfully updated.')
    } catch (err) {
      console.log('error updating player...', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('name', val)}
          placeholder="Player Name"
          value={this.state.name}
        />
        <Button onPress={this.createPlayer} title="Add Player" />
        <FlatList
          data={this.state.players}
          renderItem={({item, separators}) => (
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text>Wins: {item.wins} Loses: {item.loses} Ties: {item.ties}</Text>
                <Button title="Win" onPress={() => this.updatePlayer(item, "wins", 1)}/>
                <Button title="Lose" onPress={() => this.updatePlayer(item, "loses", 1)}/>
                <Button title="Draw" onPress={() => this.updatePlayer(item, "ties", 1)}/>
              </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
//export default withAuthenticator(App, { includeGreetings: true })

const styles = StyleSheet.create({
  input: {
    height: 45, borderBottomWidth: 2, borderBottomColor: 'black', marginVertical: 10
  },
  item: {
    borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10
  },
  name: { fontSize: 16 },
  score: { color: 'rgba(0, 0, 0, .5)' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50
  },
});

          // ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
          //   <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          // )}

              // onShowUnderlay={separators.highlight}
              // onHideUnderlay={separators.unhighlight}>
            // <TouchableHighlight
            //   onPress={() => this._onPress(item)}

            // </TouchableHighlight>

// {
//   this.state.players.map((player, index) => (
//     <View key={index} style={styles.item}>
//       <Text style={styles.name}>{player.name}</Text>
//       <Text style={styles.score}>{player[scoreType]}</Text>
//     </View>
// ))}

/*                    <Button onPress={() => {this.updatePlayer(player, scoreType, 1)}} title="+"/>
                    <Button onPress={() => {this.updatePlayer(player, scoreType, -1)}} title="-"/>*/

/*

// define mutation
const createPet = `
  mutation($name: String!, $description: String) {
    createPet(input: {
      name: $name
      description: $description
  }) {
    id
    name
    description
  }
}`


//define query
const listPets = `
  query {
    listPets {
      items {
        id
        name// execute a mutation
state = { name: '' }
onChangeText = value => {
  this.setState({ name: value })
}
createPet = async () => {
  const pet = this.state
  await API.graphql(graphqlOperation(createPet, pet))
}
        description
      }
    }
 }
`
// execute query
getPets = () => {
  const data = await API.graphql(graphqlOperation(listPets))
  // do something with data
}

//Start of Full Example
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import API, { graphqlOperation } from '@aws-amplify/api'

const listPets = `
  query {
    listPet {
      items {
        id
        name
        description
      }
    }
 }
`
const createPet = `
  mutation($name: String!, $description: String) {
    createPet(input: {
      name: $name
      description: $description
  }) {
    id
    name
    description
  }
}`

class App extends React.Component {
  state = { name: '', description: '', pets: [] }
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listPets))
      console.log('graphqldata:', graphqldata)
      this.setState({ pets: graphqldata.data.listPet.items })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  createPet = async () => {
    const pet = this.state
    if (pet.name === '' || pet.description === '') return
    const pets = [...this.state.pets, pet]
    this.setState({ pets, name: '', description: '' })
    try {
      await API.graphql(graphqlOperation(createPet, pet))
      console.log('pet successfully created.')
    } catch (err) {
      console.log('error creating pet...', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('name', val)}
          placeholder="Pet Name"
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('description', val)}
          placeholder="Pet Description"
          value={this.state.description}
        />
        <Button onPress={this.createPet} title="Add Pet" />
        {
          this.state.pets.map((pet, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={styles.description}>{pet.description}</Text>
            </View>
          ))
        }
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  input: {
    height: 45, borderBottomWidth: 2, borderBottomColor: 'black', marginVertical: 10
  },
  item: {
    borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10
  },
  name: { fontSize: 16 },
  description: { color: 'rgba(0, 0, 0, .5)' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50
  },
});

//Original Render Function
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }


//Original Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/