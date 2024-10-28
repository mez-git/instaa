import { setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikeNotification } from "../redux/rtnSlice"
const useGetRTM = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socketio);
    const { messages } = useSelector(store => store.chat);
    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        })
        socket?.on('notification', (notification) => {
            dispatch(setLikeNotification(notification));

        });
        return () => {
            socket?.off('newMessage');
            socket?.off('notification')
        }
    }, [messages, setMessages]);
};
export default useGetRTM