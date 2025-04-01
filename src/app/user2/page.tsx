"use client";

import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const User2Page = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const peer = new Peer("user2");
    peerInstance.current = peer;

    peer.on("open", () => {
      const conn = peer.connect("user1");
      conn.on("open", () => {
        console.log("Connected to User 1");
      });

      peer.on("call", (call) => {
        call.answer(); // No stream sent back
        call.on("stream", (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play();
          }
        });
        call.on("error", (err) => console.error("Call error:", err));
      });
    });

    peer.on("error", (err) => console.error("Peer error:", err));

    return () => {
      peer.destroy();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User 2 - Video Call Receiver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-md border"
          />
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a note..."
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default User2Page;