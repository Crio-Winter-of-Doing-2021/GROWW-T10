import { Text } from '../components/chatbot/components/text';
import { Reply } from '../components/chatbot/components/reply';
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
      <Text>
        You chose Pizza! Choose one ingredient:
      
      </Text>
        <Reply path='sausage'>Sausage</Reply>
        <Reply path='bacon'>Bacon</Reply>
        </div>
    )
  }
}
