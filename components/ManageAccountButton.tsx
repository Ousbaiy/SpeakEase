import { generatePotalLink } from "@/actions/generatePotalLink"

const ManageAccountButton = () => {
  return (
    <form action={generatePotalLink}>
      <button type='submit'>Manage Billing</button>
    </form>
  )
}

export default ManageAccountButton