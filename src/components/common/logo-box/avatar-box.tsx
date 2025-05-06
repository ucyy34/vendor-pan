import { motion } from "motion/react"

import { IconAvatar } from "../icon-avatar"

export default function AvatarBox({
  checked,
  size = 44,
}: {
  checked?: boolean
  size?: number
}) {
  return (
    <IconAvatar
      size={size === 44 ? "xlarge" : "small"}
      className="bg-ui-button-neutral shadow-buttons-neutral after:button-neutral-gradient relative mb-4 flex items-center justify-center rounded-xl after:inset-0 after:content-['']"
    >
      {checked && (
        <motion.div
          className="absolute -right-[5px] -top-1 flex size-5 items-center justify-center rounded-full border-[0.5px] border-[rgba(3,7,18,0.2)] bg-[#3B82F6] bg-gradient-to-b from-white/0 to-white/20 shadow-[0px_1px_2px_0px_rgba(3,7,18,0.12),0px_1px_2px_0px_rgba(255,255,255,0.10)_inset,0px_-1px_5px_0px_rgba(255,255,255,0.10)_inset,0px_0px_0px_0px_rgba(3,7,18,0.06)_inset]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <img src="/logo.svg" alt="logo" className="h-10 w-10" />
        </motion.div>
      )}
      <img src="/logo.svg" alt="logo" className="h-10 w-10" />
    </IconAvatar>
  )
}
