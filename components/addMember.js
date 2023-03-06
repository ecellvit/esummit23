import AddMemberCard from './addMemberCard'

function AddMember({session, users, eventName}) {

  return (
    <div className='grid grid-cols-3 gap-5 mt-5 ml-40'>
      {
        users?.map((x) => {
          return <AddMemberCard user={x} key={x._id} session={session} eventName={eventName} />
        })
      }
    </div>
  )
}

export default AddMember