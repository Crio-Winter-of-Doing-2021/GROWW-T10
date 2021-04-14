import { Reply } from 'src/components/chatbot/components/reply';
import { Text } from 'src/components/chatbot/components/text';
import React from 'react'
import { RequestContext } from 'src/components/chatbot/contexts'

export default class extends React.Component {
    static contextType = RequestContext
    static async botInit(request) {
        const params = request.params;
        const session = request.session;
        return { params, session }
    }
    render() {  
        return (
            <Text>
                {this.props.params.text && this.props.params.text.map((text, i) => {
                    return <div key={i}>{text}</div>
                })}
                { this.props.params.reply && 
                    this.props.params.reply.map((reply, i) => {
                        if ((reply.authRequired && this.props.session.user !==null ) || (!reply.authRequired && this.props.session.user !==null ) || (!reply.authRequired && this.props.session.user == null ) ){
                        return <Reply key={i} path={reply.path}>{reply.text}</Reply>} else{
                            return ''
                        }
                    })
                }
            </Text>
        )
    }
}
