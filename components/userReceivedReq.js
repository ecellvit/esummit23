import UserReceivedReqCard from "./UserReceivedReqCard";
import styles from "../styles/joinTeams.module.css";

function UserReceivedReq({ eventName, requests, session }) {
  console.log("all requests!!!!!!!!!!!!!!!!!!!!!", requests);
  return (
    <div>
      <div>userReceivedReq</div>
      <div className={styles.Teams}>
        {requests.length ? (
          requests.map((x) => {
            return (
              <UserReceivedReqCard
                key={x}
                request={x}
                eventName={eventName}
                session={session}
              />
            );
          })
        ) : (
          <h1>No requests</h1>
        )}
      </div>
    </div>
  );
}

export default UserReceivedReq;
