import {useEffect, useState} from 'react';
import {storage} from '../firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

function ModuleUpload() {
    const [videoUpload, setVideoUpload] = useState(null);
    const [videoList, setVideoList] = useState([]);
  
  
    const videoListRef = ref(storage, "recordings/")
    const uploadVideo = () => {
      if (videoUpload == null) return;
      const videoRef = ref(storage, `recordings/${videoUpload.name + v4()}`);
      uploadBytes(videoRef, videoUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setVideoList((prev) => [...prev, url]);
        });
      });
    };
  
  
    useEffect(() => {
      listAll(videoListRef).then((response) => {
        const urls = [];
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            urls.push(url);
            if (urls.length === response.items.length) {
              const uniqueUrls = Array.from(new Set(urls));
              setVideoList(uniqueUrls);
            }
          });
        });
      });
    }, []);
  

    return(
        <div id ="ModuleUpload">
        

        <div>
        {videoList.map((url) => {

            return (
            <video width="320" height="240" controls style={{ margin: '10px'}}>
              <source src = {url} />
            </video>
            )
          })}
          </div>

        </div>
    )
    }

    export default ModuleUpload