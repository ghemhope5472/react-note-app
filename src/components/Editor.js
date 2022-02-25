import React from 'react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function Editor( props) {
  
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  return (
    <div className='editor'>

<ReactMde
        value={props.findCurrentNote.body}
        selectedTab={selectedTab}
        onChange={props.updateNote}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        
      
      />
    </div>
  )
}

export default Editor