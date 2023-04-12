import "./Admin_User.scss";
function Admin_User() {
  return (
    <>
      <div className="admin_user">
        <h1 className="title">Report</h1>

        <div className="container">
          <p>
            Active time: <strong>5 days</strong>
          </p>
          <p>
            Electricity bill: <strong>1.250.000 VND</strong>
          </p>
          <p>
            Active time: <strong>5 days</strong>
          </p>

          <button className="btn-print">Print</button>
        </div>
      </div>
    </>
  );
}
export default Admin_User;
