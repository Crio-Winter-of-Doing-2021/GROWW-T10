import { Text } from '../components/chatbot/components/text';
import React from 'react'
import { Reply } from 'src/components/chatbot/components/reply';

export default class extends React.Component {
  render() {
    return <Text>Bot Closed!
      <Reply path="hi">Start Again!</Reply>
    </Text>

  }
}
