import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import MainLayout from './layouts/MainLayout';


function Routes() {
    return (
        <React.Suspense fallback={<LoadingScreen />}>
            <Switch>
                <Route
                    path="/app"
                    render={(props) => (<MainLayout {...props}>
                        <React.Suspense fallback={<LoadingScreen />}>
                            <Switch>
                                <Redirect
                                    exact
                                    from="/app"
                                    to="/app/conversations" 
                                />
                                <Route 
                                    exact
                                    path="/app/conversations"
                                    component={React.lazy(()=> import('src/views/conversations/ConversationListView'))}
                                />
                                 <Route 
                                    exact
                                    path="/app/conversations/:conversationId/edit"
                                    component={React.lazy(()=> import('src/views/conversations/ConversationEditView'))}
                                />
                            </Switch>
                        </React.Suspense>
                    </MainLayout>)}
                />
            </Switch>
        </React.Suspense>
    );
}

export default Routes;