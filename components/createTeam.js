export default function CreateTeam() {
  return (
    <div className="bg-black flex justify-center items-center min-h-screen text-center">
      <div className=" bg-blue-700 h-96 w-/6 md:w-1/3  rounded-2xl	p-4 ">

        <div className="text-3xl text-white">Join a Team</div>
        <button type="button" class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Find Team</button>

        <h2 className="text-4xl font-bold mt-8">OR</h2>
        <div className="mt-2">
          <div className="text-3xl text-white mt-3">Create a Team</div>
          <input
            type="text"
            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Team Name"
            required
          ></input>
          <button type="button" class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-2/3 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2">Create Team</button>

        </div>
      </div>
    </div>
  )
}
