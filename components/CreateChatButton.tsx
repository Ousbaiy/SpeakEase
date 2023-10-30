'use client'

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { MessageSquarePlusIcon } from "lucide-react"

const CreateChatButton = () => {
  const router = useRouter()

  const createNewChat = async () => {
    
    router.push('/chat/new')
  }

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon  />
    </Button>
  )
}

export default CreateChatButton