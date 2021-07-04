import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import { LegacyRef, useCallback, useEffect, useState } from "react";
import { Popup } from 'reactjs-popup';
import styles from './ChildrenList.module.css'

type Child = {
    id: string,
    name: string,
    pickupTime: string,
    checkedIn: boolean,
}
//TODO Create url factory to set access token and other parameters
const ACCESS_TOKEN = '234ffdb8-0889-4be3-b096-97ab1679752c';
const GET_URL = `https://tryfamly.co/api/daycare/tablet/group?accessToken=${ACCESS_TOKEN}&groupId=11fc220c-ebba-4e55-9346-cd1eed714620&institutionId=fb6c8114-387e-4051-8cf7-4e388a77b673`;
const getCheckinUrl = (id: string) => `https://tryfamly.co/api/v2/children/${id}/checkins`;
const getCheckoutUrl = (id: string) => `https://tryfamly.co/api/v2/children/${id}/checkout`;
const BUFFER = 3;
const BATCH = 10;
const ChildrenList = () => {

    const [children, setChildren] = useState<Child[]>([]);
    const [allowedSize, setAllowedSize] = useState(10);
    //TODO try to find better ways to update child state than to load whole list on each checkin
    const [isChildrenListStale, setIsChildrenListStale] = useState(true);
    const [childIdToCheckin, setChildIdToCheckin] = useState<string | null>(null);
    const [pickupTime, setPickupTime] = useState<string>('');
    //TODO implement loading and error state
    useEffect(() => {
        isChildrenListStale && fetch(GET_URL)
            .then((data) => data.json())
            .then((response) => {
                console.log(response);
                if (response.children) {
                    setChildren(response.children.map(((child: any) => {
                        return {
                            id: child.childId,
                            name: child.name.fullName,
                            pickupTime: child.pickupTime,
                            checkedIn: child.checkedIn,
                        }
                    })));
                }
                setIsChildrenListStale(false);
            });

    }, [isChildrenListStale]);

    const closeCheckinModal = () => {
        setChildIdToCheckin(null);
        setPickupTime('');
    }

    const handleCheckin = () => {
        //TODO add checkin validation
        if (childIdToCheckin && pickupTime) {
            //TODO refactor to avoid post data generation repeating
            fetch(getCheckinUrl(childIdToCheckin), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: ACCESS_TOKEN,
                    pickupTime: pickupTime
                })
            })
                .then(() => {
                    setIsChildrenListStale(true);
                    closeCheckinModal();
                });
        }
    }
    const handleCheckout = (id: string) => {
        fetch(getCheckoutUrl(id), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: ACCESS_TOKEN,
            })
        })
            .then(() => {
                setIsChildrenListStale(true);
            });
    }

    const loadMore = useCallback(() => {
        setAllowedSize((current) => current + BATCH);
    }, []);

    const childCard = useCallback((child: Child, ref?: LegacyRef<any>) => <div key={child.id} ref={ref}>
        {child.name}
        {child.pickupTime && (<span>Pickup time: {child.pickupTime}</span>)}
        {child.checkedIn && (<button onClick={() => handleCheckout(child.id)}>Checkout</button>)}
        {!child.checkedIn && (<button onClick={() => setChildIdToCheckin(child.id)}>Checkin</button>)}
    </div>, []);

    //TODO use virtual scroll instead of infinite one to unload nodes. Try to find good library for that
    return (
        <>
            <InfiniteScroll buffer={BUFFER} template={childCard} items={children.slice(0, allowedSize)}
                            loadMore={loadMore}/>
            <Popup open={childIdToCheckin !== null} closeOnDocumentClick onClose={closeCheckinModal}>
                <div className={styles.modal}>
                    <button className={styles.close} onClick={closeCheckinModal}>
                        &times;
                    </button>
                    <form onSubmit={(event) => {
                        handleCheckin();
                        event.preventDefault();
                    }}>
                        <label>
                            Checkin time: <input type="text" value={pickupTime}
                                                 onChange={(event) =>
                                                     setPickupTime(event.target.value)}/>
                        </label>
                        <input type="submit" value="Checkin"/>
                    </form>
                </div>
            </Popup>
        </>
    );
};

export default ChildrenList;