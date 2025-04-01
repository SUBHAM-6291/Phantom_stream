"use client";

import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const User1Page = () => {
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer("user1");
    peerInstance.current = peer;

    peer.on("open", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          peer.on("connection", (conn) => {
            conn.on("open", () => {
              const call = peer.call("user2", stream);
              call.on("error", (err) => console.error("Call error:", err));
            });
          });
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    });

    peer.on("error", (err) => console.error("Peer error:", err));

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User 1 - Video Call Starter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your video is streaming to User 2...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default User1Page;