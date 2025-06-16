<template>
  <div>
    <h2>myzPAX Vue Example</h2>
    <button @click="sendInteraction">Send Interaction</button>
    <button @click="lockManually">Manual Lock</button>
    <button @click="checkIdleAndLock">Check Idle and Lock</button>
    <button @click="openContactForm">Open Contact Form</button>
    <button @click="openFullView">Open Full View</button>
  </div>
</template>

<script>
import {
  setTargets,
  sendZpaxMessage,
  addZpaxMessageListener,
} from '../../js/myzpax-messaging.js';

export default {
  name: 'MyzPaxExample',
  mounted() {
    // Set allowed origins
    setTargets(['https://myzpax.com']);

    // Listen for lock_app message from myzPAX
    addZpaxMessageListener('lock_app', () => {
      console.log('myzPAX requested lock. Preparing to lock...');
      // perform any necessary actions that are needed before locking (e.g. Saving the state of the app)
      sendZpaxMessage('lock_app', {
        lockType: 'manual',
        afterReAuthAction: 'reload',
      });
    });

    // Listen for re_authenticated
    addZpaxMessageListener('re_authenticated', () => {
      console.log('User re-authenticated via myzPAX.');
    });
  },
  methods: {
    sendInteraction() {
      sendZpaxMessage('interaction');
    },
    lockManually() {
      sendZpaxMessage('lock_app', {
        lockType: 'manual',
        afterReAuthAction: 'reload',
      });
    },
    checkIdleAndLock() {
      const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
      const unsubscribe = addZpaxMessageListener('last_interaction', (msg) => {
        const lastInteraction = new Date(msg.data);
        const idleDuration = Date.now() - lastInteraction.getTime();

        if (idleDuration > IDLE_TIMEOUT) {
          sendZpaxMessage('lock_app', {
            lockType: 'timeout',
            removeIframe: true,
          });
        }

        unsubscribe(); // Clean up listener
      });

      sendZpaxMessage('last_interaction');
    },
    openContactForm() {
      sendZpaxMessage('open_contact_form', {
        appName: 'MyApp',
        toEmail: 'support@company.com',
      });
    },
    openFullView() {
      sendZpaxMessage('open_full_view');
    },
  },
};
</script>

<style scoped>
button {
  display: block;
  margin: 10px 0;
}
</style>
