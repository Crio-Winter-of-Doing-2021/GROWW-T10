import { Text } from 'src/components/chatbot/components/text';
import React from 'react';

export default class NotFound extends React.Component {
    render() {
        return (
            <Text>
                <div>Something Went Wrong! It's us not you.</div>
            </Text>
        )
    }
}
