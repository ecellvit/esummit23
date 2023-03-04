import AddMemberCard from './addMemberCard'

function AddMember(session, users) {
  return (
    <div className='grid grid-cols-3 gap-5 mt-5 ml-40'>
      {
        users?.map((x) => {
          return <AddMemberCard user={x} key={x._id} session={session} />
        })
      }
    </div>
  )
}

export default AddMember