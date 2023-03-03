import React, { useState } from "react";
import BingeDialog from "../../misc/BingeDialog";
import BingeSelect from "../../misc/BingeSelect";

const users = [
  {
    id: 1,
    name: "Peter Sagan",
  },

  {
    id: 2,
    name: "Chris Froome",
  },
  {
    id: 3,
    name: "Geraint Thomas",
  },
  {
    id: 4,
    name: "Egan Bernal",
  },
  {
    id: 5,
    name: "Remco Evenepoel",
  },
  {
    id: 6,
    name: "Tadej Pogacar",
  },
  {
    id: 7,
    name: "Vincenzo Nibali",
  },
  {
    id: 8,
    name: "Mikel Landa",
  },
];

const GroupsDialog = ({ isOpen, setIsOpen }) => {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleOnChange = (e) => {
    console.log(e);
    setSelectedUsers(e);
  };

  const onSubmit = () => {
    console.log("Group Name: ", groupName);
    console.log("Group Description: ", groupDescription);
    console.log("Group Members: ", selectedUsers);
  };

  return (
    <BingeDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callback={onSubmit}
      title="Create Group"
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
              isSearchable={true}
              onChange={handleOnChange}
              className="w-full"
              value={selectedUsers}
              options={users.map((item) => ({
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
