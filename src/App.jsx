import React, {useState, useEffect} from 'react'
import { useSearchParams } from "react-router-dom";
// import YtVideo from './ytVideo';
import GetytId from './getytID';
import "./App.css";
import "./index.css";
const App = () => {
  const [links, setLinks] = useState([]);
  // const [mp3Link, setMp3Link] = useEffect('')
  const [mp4Res, setMp4Res] = useState({})
  const [videoID, setVideoID] = useState("");
  const [videoLink, setvideoLink] = useState('');
  const [isValidUrl,setIsValidUrl] = useState(true);
  const [isInputVisible,setIsInputVisible] = useState(true);
  const [isResultVisible,setIsResultVisible] = useState(false);
  // const [isActionVisible,setIsActionVisible] = useState(false);
  // const [isFinalDivVisible,setIsFinalDivVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(links.length > 0 ? links[0].resolution : '');

  // 
  const [searchParams] = useSearchParams();
  const [videoUrl, setVideoUrl] = useState('');

  // 

  useEffect(() => {
    const text = searchParams.get('text');
    if (text) {
      const urlPortion = text.match(/https.+/);
      if (urlPortion.length > 0) {
        setVideoUrl(urlPortion[0]);
        setvideoLink(urlPortion[0]);
      }
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const selectedOptionValue = event.target.value;
    console.log('Selected Value:', selectedOptionValue);
    setSelectedValue(selectedOptionValue);
  };
  // 
  const getmp4 = async(id)=>{
    // 
    const mp3url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${id}`;
    const mp3options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '964936057fmshd1be41b2ccc39bbp11676fjsnb73cb21a5acf',
        'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
      }
     };
    // 
    const mp4url = `https://youtube-video-download-info.p.rapidapi.com/dl?id=${id}`;
    const mp4options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '964936057fmshd1be41b2ccc39bbp11676fjsnb73cb21a5acf',
        'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
      }
    };

    try {
        const mp3response = await fetch(mp3url, mp3options);
        const mp3result = await mp3response.json();
        console.log(mp3result.link);
        setLinks(prevLinks => [
          ...prevLinks,
          {'resolution': 'mp3',
            'link': mp3result.link}
        ]);
        const mp4response = await fetch(mp4url, mp4options);
        const mp4result = await mp4response.json();
        setMp4Res(mp4result)
        // console.log(mp4result);
      } catch (error) {
        console.log(error);
      }
  }

  
  // const handleUrlInput = (e) => {
  //   setvideoLink(e.target.value)
  // }
  const handleConvertClick = () =>{
    console.log("link :");
    console.log(videoLink);
    // check if video link is valid
    // Regular expression for a YouTube video URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)/;
    setIsValidUrl(youtubeRegex.test(videoLink));
    if(youtubeRegex.test(videoLink)){
      const vidID = GetytId(videoLink);
      setVideoID(vidID);
      setIsInputVisible(false)
      setIsResultVisible(true)

      // fetch mp4
      
      

      
      
    }
  };
  useEffect(() => {
    if(videoID.length > 1){
      getmp4(videoID)
    }
  }, [videoID])
  useEffect(() => {
    if (Object.keys(mp4Res).length !== 0) {
      const newLinksArray = Object.entries(mp4Res.link).map(([key, value]) => ({
        resolution: value[3],
        link: value[0]
      }));
  
      setLinks(prevLinks => [
        ...prevLinks,
        ...newLinksArray
      ]);
      
    }
  }, [mp4Res]);
  
  useEffect(() => {
    if (selectedValue == "") {
      return;
    }
    selectedValue(links[0].resolution)
  
  }, [links])
  
  
  return (
    <main>
      <div className="redContainer">
        <div className="title">
          <div>
            <h1>YTDL</h1>
            <p>Download Youtube Music & Videos</p>
          </div>
        </div>
        {/* input area */}
        <div className={`inputArea ${isInputVisible?'':'dn'}`}>
          <input placeholder=" Enter YT Url here:" type="text" onChange={(e)=>setvideoLink(e.target.value)} value={videoLink} />
          <button onClick={handleConvertClick}>Convert</button>
        </div>

        {/* result area */}
        <div className={`resultArea ${isResultVisible?'':'dn'}`}>
          <div className="info">
            <img src={`https://i.ytimg.com/vi/${videoID}/mqdefault.jpg`} alt="Thumbnail Unavailable" className="thumbnail" />
            <ul>
              <li><p className="vid_title">{mp4Res.title}</p></li>
              <li><p className="channel">{mp4Res.author}</p></li>
              {/* <li><p className="duration">4:53</p></li> */}
            </ul>
          </div>
          <div className={`action`}>
            

            <select name="resOption" id="res" onChange={handleChange} value={selectedValue}>
              <option value="x">select</option>
              {links.map((link, index) => (
                <option value={link.link} key={index}>
                  {link.resolution}
                </option>
              ))}
            </select>


                  
            <a href={selectedValue} target='_blank' className='getLink'>Get link</a>
          </div>
          {/* <div className={`finalDiv ${isFinalDivVisible?'':'dn'}`}>
            <button className="download">Download</button>
            <button className="convertNext">Convert Next</button>
          </div> */}
        </div>
      </div>
      {isValidUrl ? null : (
        <p style={{ color: 'red',marginTop:'50px',textAlign:"center" }}>Please enter a valid YouTube URL</p>
          )}
    </main>
  )
}

export default App