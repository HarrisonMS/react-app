import React from "react";

const TabLayout = props => {
return (
    <div>
    <h2>{props.users.name}</h2>
    <p>{props.tab.role}</p>
    </div>
    );
};
export default TabLayout;