import React, { useState, useEffect } from 'react'

export default function 
(props) {
    const [text, setText] = useState('')
    const [but, setBut] = useState(false)
    const [postData, setPostData] = useState({ });
    

function setTextii (){
    setBut(true)
    setText(document.getElementById("myInput").value)
}

useEffect(() => {
  if(but) {
    setPostData({ prompt: text, size: '512x512', n:1 });
  }
  }, [text]);
  
  useEffect(() => {
    const changeImg = async (event) => {
        if (event) {
            event.preventDefault();
          }
        let firstUrl = "";
        props.image2Fun("https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif")
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer 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'
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.data && responseData.data.length > 0) {
          firstUrl = responseData.data[0].url;
          console.log('First URL:', firstUrl);
  
        } else {
          console.log('No URLs found in the response');
        }
      } else {
        console.log('Failed to create post');
      }
    } catch (error) {
      console.log('Error creating post:', error);
    }
    props.image2Fun(firstUrl)
    
  }
  if(but) {
    changeImg();
  }
  }, [postData]);
        
  return (
    <div>
        <div className="container y-3">
        <div className="input-group rounded">
  <input type="search" className="form-control rounded" id="myInput" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <span className="input-group-text border-0" id="search-addon">
  <button type="button" className="btn btn-outline-primary" onClick={setTextii}>search</button>
  </span>
</div>
        </div>
    </div>
  )
}
