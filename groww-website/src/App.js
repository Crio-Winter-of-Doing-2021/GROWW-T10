import React from 'react';
import { Router } from 'src/utils';
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/core';
import { createTheme } from 'src/theme';
import Routes from 'src/routes';
import Auth from 'src/components/Auth';
import ScrollReset from 'src/components/ScrollReset';
import { WebChat } from 'src/components/chatbot';
import { actions } from 'src/bot/actions';
import axios from 'src/utils/axios';
import BotContext from 'src/contexts/BotContext';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();
  const ref = React.createRef();
  const [routes, setRoutes] = React.useState([]);
  const setRoute = (text) => {
    clearMessages();
    sendPayload(text);
  }

  React.useEffect(() => {
    axios.get(`/api/bot/conversations/all`).then((response) => {
      setRoutes(response.data.conversations)
    })
  }, []);

  const sendPayload = (path) => {
    ref.current.sendPayload({ path });
  }

  const clearMessages = () => {
    ref.current.clearMessages();
  }

  const updateUserSession = (user) => {
    ref.current.updateUser(user);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <WebChat
        ref={ref}
        actions={actions}
        routes={routes}
        onOpen={() => console.log('Bot Opened!')}
        onClose={() => console.log('Bot Closed!')}
      />

      <Router>

        <BotContext.Provider value={{
          setRoute,
          updateUserSession
        }}>
          <Auth>
            <ScrollReset />
            <Routes />
          </Auth>
        </BotContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
