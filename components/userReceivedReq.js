import UserReceivedReqCard from "./UserReceivedReqCard";
import styles from "../styles/joinTeams.module.css";
import NotyNav from "./notyNav";

function UserReceivedReq({ eventName, requests, session }) {
  return (
    <div>
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
