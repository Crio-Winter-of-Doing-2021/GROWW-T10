import { Text } from '../components/chatbot/components/text';
import { Reply } from '../components/chatbot/components/reply';
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Text>
          You chose Sausage on Pizza
          <br/>
          Wish to redirect to main menu?
          <Reply path='redirect'>Yes</Reply>
          <Reply path='end'>No</Reply>
        </Text>
      </div>
    )

  }
}
