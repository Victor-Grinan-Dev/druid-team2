import { useDispatch, useSelector } from "react-redux";
import { setCreateUser } from "../../features/druidSlice";
import { postUser } from "../../services/druid";

const AddUser = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.druid.createUser);

  const changeData = (e) => {
    e.preventDefault();
    dispatch(setCreateUser([e.target.name, e.target.value.toLowerCase()]));
  };

  const createUser = (e) => {
    e.preventDefault();

    if (newUser.userType && newUser.username && newUser.email) {
      postUser(newUser);
    } else {
      console.log("missing data");
    }
  };

  return (
    <div>
      <h3 className="addUserH3">Create new user</h3>
      <form onSubmit={createUser}>
        <div className="createUserContainer">
          <div>
            <label htmlFor="username" className="createUserLabels">
              {" "}
              Username:{" "}
            </label>
            <input
              type="text"
              name="username"
              id="name"
              className="createUserInputs"
              onChange={changeData}
            />
          </div>
          <div>
            <label htmlFor="email" className="createUserLabels">
              {" "}
              Email:{" "}
            </label>
            <input
              type="text"
              name="email"
              id="name"
              className="createUserInputs"
              onChange={changeData}
            />
          </div>

          <div>
            <label htmlFor="customer" className="createUserLabels">
              {" "}
              User type:{" "}
            </label>
            <select
              name="userType"
              className="createUserInputs"
              onChange={changeData}
            >
              <option hidden>Choose</option>
              <option value="developer">Developer</option>
              <option value="customer">Customer</option>
              <option value="manager">Project Manager</option>
            </select>
          </div>
          {newUser.userType === "customer" && (
            <div>
              <label htmlFor="company" className="createUserLabels">
                {" "}
                Company:{" "}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="createUserInputs"
                onChange={changeData}
              />
            </div>
          )}
          <input
            type="submit"
            value="Create user"
            className="createUserButton"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
