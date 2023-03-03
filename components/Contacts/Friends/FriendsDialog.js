import BingeDialog from "../../misc/BingeDialog";
import BingeSelect from "../../misc/BingeSelect";
import { useState } from "react";

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
const FriendsDialog = ({ isOpen, setIsOpen }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOnChange = (e) => {
    setSelectedUser(e);
  };

  const onSubmit = () => {
    console.log(selectedUser);
  };

  return (
    <BingeDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      callback={onSubmit}
      title="Add friend"
      description="Please select the user below you want to add as a friend."
    >
      <div className="flex flex-row items-center justify-between w-full">
        <span>User:</span>
        <BingeSelect
          isMulti={false}
          isSearchable={true}
          onChange={handleOnChange}
          value={selectedUser}
          className="w-3/5"
          options={users.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </div>
    </BingeDialog>
  );
};

export default FriendsDialog;
