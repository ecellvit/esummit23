import refreshData from '@/app/utils/refresh'

function MemberCard({ session, data, teamId, eventName }) {


  console.log("memeber card", data)
  const userRole = data["eHack" + 'TeamRole']

  function handleRemove(teamId) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/ehack/remove/${teamId}`, {
      method: 'PATCH',
      body:
        JSON.stringify({ userId: data._id })
      ,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        refreshData();
        toast('Team member removed Successfully');
      })
  }
  return (
    <div className="h-64 rounded-2xl hover:scale-105 ease-linear bg-blue-700 ">
      <h2>{data.email}</h2>
      {userRole ? (
        <button
          onClick={(e) => handleRemove(teamId)}
          className="bg-red-700 mt-40 w-40 rounded-md p-2"
        >
          Remove
        </button>
      ) : (
        <h2>Leader</h2>
      )}
    </div>
  )
}

export default MemberCard
