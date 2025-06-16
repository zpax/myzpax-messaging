import React, { useEffect } from 'react';
import {
  setTargets,
  sendZpaxMessage,
  addZpaxMessageListener,
} from '../../ts/myzpax-messaging';

const App: React.FC = () => {
  useEffect(() => {
    // Set allowed myzPAX origins
    setTargets(['https://myzpax.com', 'https://sandbox.myzpax.com']);

    // Listen for lock request from myzPAX
    const unsubscribeLock = addZpaxMessageListener('lock_app', () => {
      console.log('myzPAX requested lock. Locking manually...');
      // Perform any necessary actions that are needed before locking (e.g. Saving the state of the app)
      sendZpaxMessage('lock_app', {
        lockType: 'manual',
        afterReAuthAction: 'reload',
      });
    });

    // Listen for re-authentication
    const unsubscribeAuth = addZpaxMessageListener('re_authenticated', () => {
      console.log('User re-authenticated.');
    });

    // Listen for last interaction and trigger lock if idle
    // You should call this function periodically to monitor user inactivity.
    // A typical setup is to call it on a timer (e.g., every 1–2 minutes), especially in apps where sensitive data is displayed and session locking is important.
    const checkIdle = () => {
      const unsubscribe = addZpaxMessageListener('last_interaction', (msg) => {
        const lastInteraction = new Date(msg.data);
        const idleDuration = Date.now() - lastInteraction.getTime();
        const IDLE_TIMEOUT = 5 * 60 * 1000;

        if (idleDuration > IDLE_TIMEOUT) {
          sendZpaxMessage('lock_app', {
            lockType: 'timeout',
            removeIframe: true,
          });
        }

        unsubscribe(); // Clean up
      });

      sendZpaxMessage('last_interaction');
    };

    // Check idle after mount (simulate)
    checkIdle();

    // Track interaction
    const handleClick = () => sendZpaxMessage('interaction');
    document.body.addEventListener('click', handleClick);

    return () => {
      unsubscribeLock();
      unsubscribeAuth();
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  const handleContactForm = () => {
    sendZpaxMessage('open_contact_form', {
      appName: 'MyApp',
      toEmail: 'support@company.com',
    });
  };

  const handleOpenFullView = () => {
    sendZpaxMessage('open_full_view');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>myzPAX React Example</h1>
      <button onClick={handleContactForm}>Open Contact Form</button>
      <button onClick={handleOpenFullView} style={{ marginLeft: '1rem' }}>
        Open Full View
      </button>
    </div>
  );
};

export default App;
