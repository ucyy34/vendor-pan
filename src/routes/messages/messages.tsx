import { Container, Heading, Text } from "@medusajs/ui"
import { Session, Inbox } from "@talkjs/react"
import { useCallback } from "react"
import Talk from "talkjs"
import { useMe } from "../../hooks/api"
import { useConversationIds } from "../../hooks/api/messages"

export const Messages = () => {
  const { seller, isPending, error } = useMe()

  const res = useConversationIds(seller?.id!)
  console.log(res)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: seller?.id || "",
        name: seller?.name || "",
        email: seller?.email || "",
        photoUrl: seller?.photo || "",
        welcomeMessage: "Hi!",
      }),
    []
  )

  const syncConversation = useCallback((session: any) => {
    const conversation = session.getOrCreateConversation("new_conversation")

    const other = new Talk.User({
      id: "frank",
      name: "Frank",
      email: "frank@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
      welcomeMessage: "Hey, how can I help?",
    })
    conversation.setParticipant(session.me)
    conversation.setParticipant(other)

    return conversation
  }, [])

  if (isPending || !seller || !syncUser) {
    return <div>Loading...</div>
  }

  console.log({ syncUser })
  return (
    <Container className="divide-y p-0 min-h-[700px]">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading>Messages</Heading>
        </div>
      </div>

      <div className="px-6 py-4 h-[655px]">
        {__TALK_JS_APP_ID__ ? (
          <Session appId={__TALK_JS_APP_ID__} syncUser={syncUser}>
            <Inbox syncConversation={syncConversation} className="h-full" />
          </Session>
        ) : (
          <div className="flex flex-col items-center w-full h-full justify-center">
            <Heading>No TalkJS App ID</Heading>
            <Text className="text-ui-fg-subtle mt-4" size="small">
              Connect TalkJS to manage your messages
            </Text>
          </div>
        )}
      </div>
    </Container>
  )
}
