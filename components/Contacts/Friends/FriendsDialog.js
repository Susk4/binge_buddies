import BingeDialog from "../../misc/BingeDialog";
import BingeSelect from "../../misc/BingeSelect";
import { useEffect, useState } from "react";
import useFireStore from "../../../src/hook/useFireStore";

const FriendsDialog = ({ isOpen, setIsOpen, user, setRefetch }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { sendContactRequest, getPossibleContacts, loading } = useFireStore();

  useEffect(() => {
    getPossibleContacts(user.uid).then((data) => {
      setUsers(data.map((item) => ({ id: item.id, label: item.name })));
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectedUser(e);
  };

  const onSubmit = async () => {
    if (!selectedUser || selectedUser.id === "") {
      setError("Please select a user.");
      return;
    } else {
      await sendContactRequest(user.uid, selectedUser?.id);
      setIsOpen(false);
      setRefetch(true);
    }
  };

  return (
    <BingeDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callback={onSubmit}
      loading={loading}
      title="Add friend"
      description="Please select the user below you want to add as a friend."
      error={error}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <span>User:</span>
        <BingeSelect
          isLoading={loading}
          isDisabled={loading}
          isMulti={false}
          isSearchable={true}
          onChange={handleOnChange}
          value={selectedUser}
          className="w-3/5"
          options={users}
        />
      </div>
    </BingeDialog>
  );
};

export default FriendsDialog;
