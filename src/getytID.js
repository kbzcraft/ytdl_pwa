const GetytId = (videoLink) =>{

const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

// Extract video ID using the regular expression
const match = videoLink.match(regex);
const videoId = match ? match[1] : null;
return videoId
}

export default GetytId;