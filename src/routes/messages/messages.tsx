import { Container, Heading, Text } from '@medusajs/ui';
import { Session, Inbox } from '@talkjs/react';
// import { useCallback } from 'react';
// import Talk from 'talkjs';

export const Messages = () => {
  // const syncUser = useCallback(
  //   () =>
  //     new Talk.User({
  //       id: 'sample_user_sebastian',
  //       name: 'Nina',
  //       email: 'nina@example.com',
  //       photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
  //       welcomeMessage: 'Hi!',
  //     }),
  //   []
  // );

  // const syncConversation = useCallback((session: any) => {
  //   const conversation = session.getOrCreateConversation(
  //     'new_conversation'
  //   );

  //   const other = new Talk.User({
  //     id: 'frank',
  //     name: 'Frank',
  //     email: 'frank@example.com',
  //     photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
  //     // welcomeMessage: 'Hey, how can I help?',
  //   });
  //   conversation.setParticipant(session.me);
  //   conversation.setParticipant(other);

  //   return conversation;
  // }, []);

  return (
    <Container className='divide-y p-0 min-h-[700px]'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div>
          <Heading>Messages</Heading>
        </div>
      </div>

      <div className='px-6 py-4 h-[655px]'>
        {__TALK_JS_APP_ID__ ? (
          <Session
            appId={__TALK_JS_APP_ID__}
            // syncUser={syncUser}
            userId='sample_user_sebastian'
          >
            <Inbox
              conversationId='sample_conversation'
              // syncConversation={syncConversation}
              className='h-full'
            />
          </Session>
        ) : (
          <div className='flex flex-col items-center w-full h-full justify-center'>
            <Heading>No TalkJS App ID</Heading>
            <Text
              className='text-ui-fg-subtle mt-4'
              size='small'
            >
              Connect TalkJS to manage your messages
            </Text>
          </div>
        )}
      </div>
    </Container>
  );
};
