import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

import FilledMic from '../icons/FilledMic';

import Text from '../Text';

const AudioRecorder = ({
  setAudio,
  mediaRecorder,
  setMediaRecorder,
  recording,
  setRecording,
}: any) => {
  const { t } = useTranslation('common');

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [time, setTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>();
  const [isPermission, setIsPermission] = useState(false);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = (): void => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e: BlobEvent) =>
          chunksRef.current.push(e.data);
        recorder.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/mp4' });
          setAudioBlob(audioBlob);
        };
        recorder.start();
        setRecording(true);
        setTime(Date.now() - elapsedTime);
        setMediaRecorder(recorder);
      })
      .catch((error: Error) => {
        console.log('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();

      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      }
    }
  };

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });

        setIsPermission(true);
      } catch (error) {
        console.error('Error requesting microphone permission:', error);

        setIsPermission(false);
      }
    };

    requestMicrophonePermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioBlob) {
      setAudioSrc(URL.createObjectURL(audioBlob));
      setAudio(audioBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob]);

  useEffect(() => {
    if (isPermission) startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission]);

  useEffect(() => {
    startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recording) {
      const timerId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - time);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [recording, time]);

  useEffect(() => {
    if (Math.floor(elapsedTime / 1000) === 60) {
      stopRecording();
      setRecording(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedTime]);

  useEffect(() => {
    if (!recording) {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recording]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="flex flex-col w-full"
      >
        <div className="flex flex-row space-x-2 items-center h-full w-full">
          {recording && (
            <div className="flex items-center w-fit">
              <FilledMic className="flex-none text-red-500" />
              <Text className="w-14 text-center">
                {elapsedTime === 0 ? 1 : 0}:
                {elapsedTime === 0
                  ? '00'
                  : (60 - (Math.floor(elapsedTime / 1000) % 60))
                      .toFixed(0)
                      .toString()
                      .padStart(2, '0')}
              </Text>
            </div>
          )}
          {recording ? (
            <div className="h-4 bg-neutral-200 w-full rounded-full">
              <motion.div
                className="bg-indigo-400 h-full w-full rounded-full"
                style={{
                  width: `${(Math.floor(elapsedTime / 1000) / 60) * 100}%`,
                }}
                initial={{ width: '0%' }}
                animate={{
                  width: `${(Math.floor(elapsedTime / 1000) / 60) * 100}%`,
                }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          ) : isPermission ? (
            <audio controls src={audioSrc} className="w-full h-8" />
          ) : (
            <Text variant="label">
              {t('audio-recorder-message')}{' '}
              <span
                className="underline text-indigo-700 font-semibold hover:text-indigo-900 cursor-pointer"
                onClick={startRecording}
              >
                {t('audio-recorder-permission')}
              </span>
            </Text>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioRecorder;
