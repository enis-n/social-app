import React from "react";
import { Dropdown, Header, Menu } from "semantic-ui-react";
const jobOptions = [
  {
    key: "Front-end Dev",
    text: "Front-end Dev",
    value: "Front-end Dev",
    name: "Front-end Dev",
  },
  {
    key: "Back-end Dev",
    text: "Back-end Dev",
    value: "Back-end Dev",
    name: "Back-end Dev",
  },
  { key: "DevOps", text: "DevOps", value: "DevOps", name: "DevOps" },
];
function JobFilters() {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        {/* <Dropdown placeholder="Select category" selection options={jobOptions}/> connect as props in the future */}
        <Dropdown placeholder="Select category" selection options={jobOptions} />
        <Header />
      </Menu>
    </>
  );
}

export default JobFilters;
