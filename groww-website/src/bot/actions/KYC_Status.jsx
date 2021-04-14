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
        console.log(this.props.session)
        return (
            <React.Fragment>
                { this.props.session.user && !this.props.session.user.kycStatus ?
                    <>
                        <Text>
                            <div >Hello! Your KYC is not completed!. You can refer below FAQ to help you complete the process. </div>
                        </Text>
                        <Reply path="How can I get my Full KYC done?" >How can I get my Full KYC done?</Reply>
                    </>
                    : ''
                }
            </React.Fragment>
        )
    }
}
