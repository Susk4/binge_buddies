import React, { useState, useEffect } from "react";
import BingeDialog from "../../misc/BingeDialog";
import BingeSelect from "../../misc/BingeSelect";
import useFireStore from "../../../src/hook/useFireStore";

const GroupsDialog = ({ isOpen, setIsOpen, user }) => {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const { getContacts, loading, createGroup } = useFireStore();

  useEffect(() => {
    getContacts(user.uid).then((data) => {
      setFriends(data);
    });
  }, []);

  const handleOnChange = (e) => {
    console.log(e);
    setSelectedUsers(e);
  };

  const onSubmit = () => {
    if (
      !groupName ||
      groupName === "" ||
      !groupDescription ||
      groupDescription === "" ||
      !selectedUsers ||
      selectedUsers.length === 0
    ) {
      setError("Please fill out all of the fields.");
    } else {
      createGroup(
        groupName,
        groupDescription,
        selectedUsers.map((user) => user.value),
        user.uid
      );

      setIsOpen(false);
    }
  };

  return (
    <BingeDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callback={onSubmit}
      title="Create Group"
      loading={loading}
      error={error}
      description="Please fill out the form below to create a new group."
    >
      <div className="flex flex-col gap-2  items-center justify-between w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <span>Group Name:</span>
          <input
            type="text"
            className=" rounded-xl p-2"
            placeholder="The Binge Watchers"
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <span>Group Description:</span>
          <input
            type="text"
            className=" rounded-xl p-2"
            placeholder="We watch movies and tv shows together."
            onChange={(e) => {
              setGroupDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col  w-full">
          <span className="text-center">Group members</span>
          <div>
            <BingeSelect
              isMulti={true}
              isLoading={loading}
              isDisabled={loading}
              isSearchable={true}
              onChange={handleOnChange}
              className="w-full"
              value={selectedUsers}
              options={friends.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </div>
        </div>
      </div>
    </BingeDialog>
  );
};

export default GroupsDialog;
