"use client";
import AddMemberCard from "./addMemberCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

function AddMember({ session, users, eventName }) {
  const router = useRouter();

  return (
    <div className={styles.Teams}>
      <button
        onClick={() => router.back()}
        className="fixed bottom-2 left-35 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        Go Back
      </button>
      <div className={styles.Teams}>
        {users?.map((x) => {
          return (
            <AddMemberCard
              user={x}
              key={x._id}
              session={session}
              eventName={eventName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddMember;
