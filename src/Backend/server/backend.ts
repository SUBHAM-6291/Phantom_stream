// Backend/server/backend/video.ts
import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";

interface VideoCallLogicProps {
  role: "host" | "viewer"; // Simplified roles
  videoRef?: React.RefObject<HTMLVideoElement | null>; // Optional, only for viewer
}

export const useVideoCallLogic = ({ role, videoRef }: VideoCallLogicProps) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [inCall, setInCall] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const callsRef = useRef<Map<string, MediaConnection>>(new Map());

  useEffect(() => {
    const peerInstance = new Peer(role, {
      host: "0.peerjs.com",
      port: 443,
      secure: true,
    });

    peerInstance.on("open", () => {
      console.log(`${role} peer open`);
      setPeer(peerInstance);
    });

    peerInstance.on("call", (call) => {
      if (role === "host" && streamRef.current) {
        call.answer(streamRef.current); // Host answers with their stream
      }
      if (role === "viewer") {
        handleCall(call); // Viewer receives the stream
      }
    });

    peerInstance.on("error", (err) => console.error("PeerJS error:", err));

    return () => {
      peerInstance.destroy();
      endCall();
    };
  }, [role]);

  const startVideo = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false, // Adjust as needed
    });
  };

  const handleCall = (call: MediaConnection) => {
    call.on("stream", (remoteStream) => {
      if (videoRef?.current) {
        videoRef.current.srcObject = remoteStream;
        videoRef.current.play().catch((err) => console.error("Video play error:", err));
      }
    });
    callsRef.current.set(call.peer, call);
  };

  const startCall = async () => {
    if (!peer) return;

    if (role === "host") {
      await startVideo();
      setInCall(true);
    } else if (role === "viewer") {
      const call = peer.call("host", null as any); // Viewer calls host, no stream sent
      if (call) handleCall(call);
      setInCall(true);
    }
  };

  const endCall = () => {
    callsRef.current.forEach((call) => call.close());
    callsRef.current.clear();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (videoRef?.current) videoRef.current.srcObject = null;
    setInCall(false);
  };

  return { inCall, startCall, endCall, streamRef };
};