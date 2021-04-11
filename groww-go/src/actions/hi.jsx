import { Reply } from '../components/chatbot/components/reply';
import { Text } from '../components/chatbot/components/text';
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
      <Text>
        Hi! Choose what you want to eat:
       
      </Text>
      <Reply path='pizza'>Pizza</Reply>
        <Reply path='pasta'>Pasta</Reply>
      </div>
    )
  }
}
