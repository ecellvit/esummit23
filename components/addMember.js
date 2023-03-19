"use client";
import AddMemberCard from "./addMemberCard";
import { useRouter } from "next/navigation";
import styles from "../styles/joinTeams.module.css";

function AddMember({ session, users, eventName }) {
  const router = useRouter();

  return (
    <div className={styles.Teams}>
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
