import { useCallback } from "react"
import Talk from "talkjs"
import { Session } from "@talkjs/react"

import { useMe } from "../../hooks/api"

export const TalkjsProvider = ({ children }: { children: React.ReactNode }) => {
  const { seller, error } = useMe()

  const syncUser = useCallback(() => {
    return new Talk.User({
      id: seller?.id || "",
      name: seller?.name || "",
      email: seller?.email || null,
      photoUrl: seller?.photo || "/talkjs-placeholder.jpg",
    })
  }, [seller])

  if (!__TALK_JS_APP_ID__ || error) return <>{children}</>

  return (
    <Session appId={__TALK_JS_APP_ID__} syncUser={syncUser}>
      {children}
    </Session>
  )
}
