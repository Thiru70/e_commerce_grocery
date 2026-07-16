import { useEffect, useState } from "react";

import LockTable from "../../components/admin/locks/LockTable";

import {

    getActiveLocks,

    releaseLock

} from "../../services/lockService";

const LockMonitor=()=>{

    const [locks,setLocks]=useState([]);

    const loadLocks=async()=>{

        const data=await getActiveLocks();

        setLocks(data);

    };

    useEffect(()=>{

        loadLocks();

    },[]);

    const handleRelease=async(lock)=>{

        if(

            !window.confirm(

                "Release reservation?"

            )

        ) return;

        await releaseLock(lock._id);

        loadLocks();

    };

    return(

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Lock Monitor

            </h1>

            <LockTable

                locks={locks}

                onRelease={handleRelease}

            />

        </div>

    );

};

export default LockMonitor;