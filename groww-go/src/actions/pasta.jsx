import { Text } from '../components/chatbot/components/text';
import { Reply } from '../components/chatbot/components/reply';
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <Text>
        You chose Pasta! Choose one ingredient:
        <Reply path='cheese'>Cheese</Reply>
        <Reply path='tomato'>Tomato</Reply>
      </Text>
    )
  }
}
