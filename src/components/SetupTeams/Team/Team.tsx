import { createTeamMember } from "components/SetupDialog/utilts";
import { ChangeEvent, useState } from "react";
import { ITeamProps } from "./types";

export const Team = ({ team, onAddTeamMember, onRemoveTeamMember }: ITeamProps) => {
  const [newMemberName, setNewMemberName] = useState('');
  const { color, name, members } = team;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMemberName(event.target.value);
  };

  const handleNameBlur = () => {
    const trimmedName = newMemberName.trim();

    if (trimmedName.length > 1) {
      const newTeamMember = createTeamMember(trimmedName);

      onAddTeamMember(newTeamMember);
    }

    setNewMemberName('');
  }

  return (
    <div style={{ border: '2px solid black '}}>
      <p style={{ color }}>{name}</p>
      <div>
        {members.map((member) => (
          <div key={member.id}>
            <span>{member.name}</span>
            <button onClick={() => onRemoveTeamMember(member.id)}>Remove</button>
          </div>
        ))}
        <input type="text" value={newMemberName} onChange={handleNameChange} onBlur={handleNameBlur} />
      </div>
    </div>
  )
}