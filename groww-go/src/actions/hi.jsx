import { Reply } from '../components/chatbot/components/reply';
import { Text } from '../components/chatbot/components/text';
import React from 'react'
import { RequestContext } from '../components/chatbot/contexts'



export default class extends React.Component {
  static contextType = RequestContext
  static async botInit(request) {
    const params = request.params;
    return params
  }
  render() {
    return (
        <Text>
          {this.props.text.map((text, i) => {
            return <div key={i}>{text}</div>
          })}
          {
            this.props.reply.map((reply, i) => {
              return <Reply key={i} path={reply.path}>{reply.text}</Reply>
            })
          }
        </Text> 
    )
  }
}
