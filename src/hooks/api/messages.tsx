import { useQuery } from "@tanstack/react-query"

export const useConversationIds = (sellerId: string) => {
  //   const { data, ...rest } = useQuery({
  //     queryKey: ["conversationIds"],
  //     queryFn: async () =>
  //       await fetch(
  //         `https://api.talkjs.com/v1/${process.env.VITE_TALK_JS_APP_ID}/conversations`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.VITE_TALKJS_SECRET_KEY}`,
  //           },
  //         }
  //       ),
  //   })

  //   const allConversations = data?.data

  //   const sellerConversations = allConversations.filter((conv: any) =>
  //     conv.participants.includes(sellerId)
  //   )

  return { conversationIds: [] }
  //   return { conversationIds: [], ...rest }
}
