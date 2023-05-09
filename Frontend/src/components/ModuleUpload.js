import { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';

function ModuleUpload() {
  const [videoUpload, setVideoUpload] = useState(null);
  const [videoList, setVideoList] = useState([]);

  const videoListRef = ref(storage, "recordings/")

  const uploadVideo = () => {
    if (videoUpload == null) return;
    const videoRef = ref(storage, `recordings/${videoUpload.name + v4()}`);
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoList((prev) => [...prev, { url, ref: snapshot.ref }]);
      });
    });
  };

  const handleDelete = (index) => {
    const videoToDelete = videoList[index];
    deleteObject(videoToDelete.ref).then(() => {
      setVideoList((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    });
  };

  useEffect(() => {
    listAll(videoListRef).then((response) => {
      const urls = [];
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          urls.push({ url, ref: item });
          if (urls.length === response.items.length) {
            setVideoList(urls);
          }
        });
      });
    });
  }, []);

  return (
    <div id="ModuleUpload">
      <input
        type="file"
        onChange={(event) => {
          setVideoUpload(event.target.files[0]);
        }}
      />

      <button id="Module_Upload_btn" onClick={uploadVideo}>
        Upload Video
      </button>

      <div>
        {videoList.map((video, index) => {
          return (
            <div key={index}>
              <video width="320" height="240" controls style={{ margin: '10px' }}>
                <source src={video.url} />
              </video>
              <button ctype="button" id = "videodel" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModuleUpload;
