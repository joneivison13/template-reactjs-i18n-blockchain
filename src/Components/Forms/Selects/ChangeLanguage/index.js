import React, { useContext } from "react";
import { Context } from "../../../../context";

// import { Container } from './styles';

function ChangeLanguage() {
  const context = useContext(Context);
  return (
    <select
      onChange={(e) => context.updateLanguage(e.target.value)}
      value={context.language}
    >
      {context.languages.map((i) => {
        return (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        );
      })}
    </select>
  );
}

export default ChangeLanguage;
