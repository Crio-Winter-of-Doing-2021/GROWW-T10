import React from 'react';
import { axios } from 'src/utils';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import SplashScreen from 'src/components/SplashScreen';
import GraphWrapper from './GraphWrapper';
import { ReactFlowProvider } from 'react-flow-renderer';


function ConversationEditView({ match }) {
    const { conversationId } = match.params;
    const [conversation, setConversation] = React.useState(null);
    const isMountedRef = useIsMountedRef();

    const getConversation = React.useCallback(() => {
        axios.get(`/api/bot/conversations?id=${conversationId}`).then((response) => {
            if (isMountedRef.current) {
                setConversation(response.data);
            }
        });
    }, [isMountedRef, conversationId]);

    React.useEffect(() => {
        getConversation();
    }, [getConversation]);

    if (!conversation) {
        return <SplashScreen />
    }

    return (
        <ReactFlowProvider>
            <GraphWrapper conversation={conversation} />
        </ReactFlowProvider>
    );
}

export default ConversationEditView;