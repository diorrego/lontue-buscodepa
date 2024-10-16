import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import { VideoProps } from '../interfaces/Video.interface';

const Video = ({
  src,
  className,
  muted = true,
  width = 400,
  height = 400,
}: VideoProps) => {
  const videoParentRef = useRef<HTMLVideoElement>(null);
  const [shouldUseImage, setShouldUseImage] = useState(false);

  const userAgentString = navigator.userAgent;

  const safariAgent = userAgentString.includes('Safari');
  const chromeAgent = userAgentString.includes('Chrome');

  const isSafari = chromeAgent && safariAgent ? false : true;

  const videoHtml = `
    <video
      class="${className}"
      loop
      muted="${muted}"
      autoplay
      playsinline
      preload="metadata"
    >
      <source src="${src}" />
    </video>
  `;

  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari && videoParentRef.current) {
      // obtain reference to the video element
      const player: any = videoParentRef.current.children[0];

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false;
        player.playsinline = true;
        player.muted = true;
        player.setAttribute('muted', ''); // leave no stones unturned :)
        player.autoplay = true;

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play();
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                if (videoParentRef.current)
                  videoParentRef.current.style.display = 'none';
                setShouldUseImage(isSafari);
              });
          }
        }, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return shouldUseImage ? (
    <Image
      src={src}
      alt="Muted Video"
      unoptimized
      className={className}
      width={width}
      height={height}
    />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: videoHtml }} />
  );
};

export default Video;
