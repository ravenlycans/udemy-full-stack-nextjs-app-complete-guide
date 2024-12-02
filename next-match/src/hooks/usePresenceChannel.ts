import usePresenceStore from "@/hooks/usePresenceStore";
import {useCallback, useEffect, useRef} from "react";
import {Channel, Members} from "pusher-js";
import {pusherClient} from "@/lib/pusher";

export const usePresenceChannel = () => {
    const {set, add, remove} = usePresenceStore(state => ({
        set: state.set,
        add: state.add,
        remove: state.remove
    }));

    const channelRef = useRef<Channel | null>(null);
    const handleSetMembers = useCallback((memberIds: string[]) => {
        set(memberIds);
    }, [set]);
    const handleAddMembers = useCallback((memberId: string) => {
        add(memberId);
    }, [add]);
    const handleRemoveMember = useCallback((memberId: string) => {
       remove(memberId);
    }, [remove]);

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe('presence-nm');

            channelRef.current.bind('pusher:subscription_succeeded', (members: Members) => {
                handleSetMembers(Object.keys(members.members));
            });

            channelRef.current.bind('pusher:member_added', (member: Record<string, never>) => {
                handleAddMembers(member.id);
            });

            channelRef.current.bind('pusher:member_removed', (member: Record<string, never>) => {
                handleRemoveMember(member.id);
            });
        }

        return () => {
            if (channelRef.current) {
                channelRef.current.unsubscribe();

                channelRef.current.unbind('pusher:subscription_succeeded');
                channelRef.current.unbind('pusher:member_added');
                channelRef.current.unbind('pusher:member_removed');
            }
        };
    }, [handleSetMembers, handleAddMembers, handleRemoveMember]);
}